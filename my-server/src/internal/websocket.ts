import { stringify } from 'querystring';
import { WrappedTerminalConsole } from '@gongt/qqbot';
import { timeout } from '@idlebox/common';
import WebSocket from 'ws';

const console = new WrappedTerminalConsole('WS');

export interface IConnectOptions extends IConnectOptionsBot {
	address: IUnixSocket | IServerPortPair;
	verifyKey?: string; // 配置文件中指定
	reservedSyncId: string; // 配置文件中指定
}

type IUnixSocket = string;

interface IServerPortPair {
	server: string;
	port: string;
	subPath?: string;
	ssl?: boolean;
}
interface IConnectOptionsBot {
	sessionKey?: string; // 新建连接 或 singleMode 模式下为空, 通过已有 sessionKey 连接时不可为空
	qq?: number; // 绑定的账号, singleMode 模式下为空, 非 singleMode 下新建连接不可为空
}

export function createServerUrl({ address, verifyKey, sessionKey, qq }: IConnectOptions) {
	let url = '';
	if (typeof address === 'string') {
		url = 'ws+unix:' + address + ':';
	} else {
		url = address.ssl ? 'wss://' : 'ws://';
		url += address.server + ':' + address.port;
		if (address.subPath) {
			url += address.subPath;
		}
	}

	const qs: Record<string, string> = {};
	if (verifyKey) {
		qs.verifyKey = verifyKey;
	}
	if (sessionKey) {
		qs.sessionKey = sessionKey;
	}
	if (qq) {
		qs.qq = qq.toString();
	}

	url += '/all?' + stringify(qs);

	return url;
}

export async function websocketHandshake(connectionOptions: IConnectOptions): Promise<WebSocket> {
	const url = createServerUrl(connectionOptions);

	console.log('尝试连接Mirai HTTP服务器：%s ...', url);
	const ws = new WebSocket(url);
	const waitConnect = new Promise<void>((resolve, reject) => {
		ws.once('open', () => {
			ws.off('error', onerror);
			console.success(' * 成功');
			resolve();
		});
		function onerror(e: Error) {
			console.error(' * 失败: %s', e.message);
			reject(e);
		}
		ws.once('error', onerror);
	});

	const waitHello = new Promise<void>((resolve) => {
		ws.once('message', (incomming: string) => {
			const message = JSON.parse(incomming);
			const session = message?.data?.session;
			connectionOptions.sessionKey = session;
			console.log('session id: %s', session);
			resolve();
		});
	});

	await waitConnect;
	await Promise.race([waitHello, timeout(5000, '服务器没有在5秒内响应命令')]);

	console.success(' * 握手成功');
	return ws;
}
