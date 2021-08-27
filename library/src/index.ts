import { sleep } from '@idlebox/common';
import WebSocket from 'ws';
import { MiraiClientCommander } from './inc/commander';
import { QQApiCode } from './inc/enum';
import { ApiError } from './inc/error';
import { Events } from './inc/events';
import { HeartbeatController } from './inc/heartbeatController';
import { WrappedConsole } from './inc/logger';
import { PromiseList } from './inc/promiseList';
import { IConnectOptions, websocketHandshake } from './inc/websocket';

const console = new WrappedConsole('Client');

export class MiraiWebsocketClient {
	private declare ws: WebSocket;
	private quit: boolean = false;

	private readonly promiseList = new PromiseList();
	private readonly heartbeat = new HeartbeatController(this);
	public readonly events = new Events();
	public readonly commander = new MiraiClientCommander(this);

	constructor(private readonly connectionOptions: IConnectOptions) {
		this.onNetworkBreak = this.onNetworkBreak.bind(this);
		this.handler = this.handler.bind(this);
	}

	async connect() {
		if (this.quit) return;
		if (this.ws) {
			console.error('mirai client already connected');
		}

		const ws = await websocketHandshake(this.connectionOptions);
		this.ws = ws;

		ws.on('close', this.onNetworkBreak);

		ws.on('error', (e) => {
			console.error('error during websocket connection: %s', e);
		});

		ws.on('message', this.handler);

		this.heartbeat.start();
		this.promiseList.enableTimeout();
	}

	private onNetworkBreak() {
		console.warn(' * websocket connection broken');
		this.heartbeat.stop();
		this.promiseList.clear();

		if (this.quit) {
			return;
		}

		console.debug(' - try reconnect');
		sleep(5000).then(() => {
			if (this.quit) return;

			this.ws = null as any;
			this.connect();
		});
	}

	private handler(incomming: string) {
		console.debug('incomming message: %s', incomming);
		const message = JSON.parse(incomming);

		const syncId: string = message.syncId;

		if (syncId === this.connectionOptions.reservedSyncId) {
			this.events.handleIncommingEvent(message.data);
			return;
		}

		if (this.promiseList.has(syncId)) {
			this.promiseList.done(syncId, message.data);
		} else {
			console.error('unknown sync id: %s', incomming);
		}
	}

	_sendRaw(syncId: string, command: string, subCommand: string | null, content: any) {
		if (content) {
			content.sessionKey = this.connectionOptions.sessionKey;
		} else {
			content = { sessionKey: this.connectionOptions.sessionKey };
		}
		this.ws.send(JSON.stringify({ syncId, command, subCommand: subCommand || null, content }));
	}

	async createPromise(syncId: string, timeoutMs?: number): Promise<any> {
		const ret = await this.promiseList.create(syncId, timeoutMs);
		if (ret.code !== QQApiCode.OK) {
			throw new ApiError(ret.code, ret.message);
		}
		return ret.data;
	}

	private async _close() {
		this.heartbeat.dispose();
		this.promiseList.dispose();

		if (!this.ws) return;

		console.log('closing...');
		const p = new Promise<void>((resolve) => {
			this.ws.once('close', resolve);
		});

		if (this.ws.readyState === this.ws.CONNECTING) {
			this.ws.terminate();
			await p;
		} else if (this.ws.readyState === this.ws.OPEN) {
			this.ws.close();
			await p;
		}

		console.debug(' * closed');
	}

	dispose() {
		if (this.quit) {
			console.error('duplicate dispose');
			return;
		}
		this.quit = true;

		this.events.dispose();
		return this._close();
	}
}
