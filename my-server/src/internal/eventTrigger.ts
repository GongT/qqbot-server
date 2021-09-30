import { EventRegistry, QQEvent, WrappedTerminalConsole } from '@gongt/qqbot';
import { definePublicConstant, Disposable, Emitter, ucfirst } from '@idlebox/common';

const console = new WrappedTerminalConsole('Events');
export interface IServerEventReceiver extends EventRegistry, ServerEventReceiver {}

export function createServerEventReceiver(): IServerEventReceiver {
	return new ServerEventReceiver() as any;
}

class ServerEventReceiver extends Disposable {
	private readonly events: Record<string, Emitter<any>> = {};
	private readonly _onUnknownType = this._register(new Emitter<any>());
	public readonly onUnknownType = this._onUnknownType.register;

	constructor() {
		super();
		for (const [localName, netName] of Object.entries(QQEvent)) {
			this.events[netName] = this._register(new Emitter());
			// console.debug('event type %s trigger %s', netName, 'on' + ucfirst(localName));
			definePublicConstant(this, 'on' + ucfirst(localName), this.events[netName].register);
		}
	}

	public handleIncommingEvent(input: any) {
		const { type, ...extra } = input;
		if (!type) {
			console.error('来自Mirai的消息没有type字段: %s', input);
			return;
		}
		console.debug('处理事件 - %s -> %s', type, extra);
		if (this.events[type]) {
			this.events[type].fireNoError(extra);
		} else {
			this._onUnknownType.fireNoError(input);
		}
	}
}
