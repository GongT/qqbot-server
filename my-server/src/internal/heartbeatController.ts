import { WrappedTerminalConsole } from '@gongt/qqbot';
import { MiraiWebsocketClient } from './client';

const console = new WrappedTerminalConsole('Heartbeat');

export class HeartbeatController {
	private timer?: NodeJS.Timer;
	private increament: number = 0;

	constructor(private readonly client: MiraiWebsocketClient) {
		this.heartbeat = this.heartbeat.bind(this);
	}

	dispose() {
		this.stop();
	}

	stop() {
		if (!this.timer) return;
		clearInterval(this.timer);
		delete this.timer;
		this.increament = 0;
	}

	start() {
		this.timer = setInterval(this.heartbeat, 30 * 1000);
		this.heartbeat();
	}

	private _heartbeat(): Promise<void> {
		this.increament++;
		const id = `hb:${this.increament}`;
		const promise = this.client.createPromise(id, 2000);
		this.client._sendRaw(id, 'about', null, {});
		return promise;
	}

	private heartbeat() {
		this._heartbeat().catch((e) => {
			console.error('心跳命令失败 - %s', e);
		});
	}
}
