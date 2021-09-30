import { ApiError, QQApiCode, WrappedTerminalConsole } from '@gongt/qqbot';
import { sleep } from '@idlebox/common';
import WebSocket from 'ws';
import { createServerCommandSender } from './commander';
import { createServerEventReceiver } from './eventTrigger';
import { HeartbeatController } from './heartbeatController';
import { PromiseList } from './promiseList';
import { IConnectOptions, websocketHandshake } from './websocket';

const console = new WrappedTerminalConsole('Client');

export class MiraiWebsocketClient {
	private declare ws: WebSocket;
	private quit: boolean = false;

	private readonly promiseList = new PromiseList();
	private readonly heartbeat = new HeartbeatController(this);
	public readonly events = createServerEventReceiver();
	public readonly commander = createServerCommandSender(this);

	constructor(private readonly connectionOptions: IConnectOptions) {
		this.onNetworkBreak = this.onNetworkBreak.bind(this);
		this.handler = this.handler.bind(this);
	}

	async connect() {
		if (this.quit) return;
		if (this.ws) {
			console.error('重复调用connect');
		}

		const ws = await websocketHandshake(this.connectionOptions);
		this.ws = ws;

		ws.on('close', this.onNetworkBreak);

		ws.on('error', (e) => {
			console.error('WS错误：%s', e);
		});

		ws.on('message', this.handler);

		this.heartbeat.start();
		this.promiseList.enableTimeout();
	}

	private onNetworkBreak() {
		console.warn(' * WS连接断开');
		this.heartbeat.stop();
		this.promiseList.clear();

		if (this.quit) {
			return;
		}

		console.debug(' - 尝试重连');
		sleep(5000).then(() => {
			if (this.quit) return;

			this.ws = null as any;
			this.connect();
		});
	}

	private handler(incomming: string) {
		console.debug('Mirai发来消息: %s', incomming.toString());
		const message = JSON.parse(incomming);

		const syncId: string = message.syncId;

		if (syncId === this.connectionOptions.reservedSyncId) {
			this.events.handleIncommingEvent(message.data);
			return;
		}

		if (this.promiseList.has(syncId)) {
			this.promiseList.done(syncId, message.data);
		} else {
			console.error('⚠未知同步ID - %s', incomming);
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

		console.log('WS连接正在关闭...');
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

		console.debug(' * 成功');
	}

	dispose() {
		if (this.quit) {
			console.error('重复调用dispose');
			return;
		}
		this.quit = true;

		this.events.dispose();
		return this._close();
	}
}
