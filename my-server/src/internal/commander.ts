import { CommandRegistry, QQCommand } from '@gongt/qqbot';
import { definePublicConstant, lcfirst, nameFunction } from '@idlebox/common';
import { MiraiWebsocketClient } from './client';

// const console = new WrappedTerminalConsole('Commander');

class MiraiClientCommander {
	private increament: number = 0;

	constructor(private client: MiraiWebsocketClient) {
		for (const [localName, cmd] of Object.entries(QQCommand)) {
			const callName = lcfirst(localName);
			const [main, sub] = cmd.split('+');

			// console.debug('define %s() as', callName, main, sub);
			definePublicConstant(
				this,
				callName,
				nameFunction(callName, (input: any) => {
					return this._send(main, sub, input);
				})
			);
		}
	}

	protected _send(cmd: string, sub: string | null, data: any): Promise<any> {
		this.increament++;
		const id = `cmd:${this.increament}`;
		const p = this.client.createPromise(id);
		this.client._sendRaw(id, cmd, sub, data);
		return p;
	}
}

export function createServerCommandSender(client: MiraiWebsocketClient): CommandRegistry {
	return new MiraiClientCommander(client) as any;
}
