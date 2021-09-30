import { dirname, resolve } from 'path';
import {
	CommandRegistry,
	EventRegistry,
	IPCClientMessage,
	IPCMessage,
	IPCMessageLifecycleAction,
	IPCServerMessage,
	QQEvent,
	WrappedTerminalConsole,
} from '@gongt/qqbot';
import { AsyncDisposable, Disposable, timeout } from '@idlebox/common';
import { ExecaChildProcess, node } from 'execa';
import { PLUGIN_ROOT } from '../constants';

export class Plugin extends AsyncDisposable {
	public readonly entryFilePath: string;
	private console: WrappedTerminalConsole;
	private instance?: PluginInstance;

	constructor(
		public readonly name: string,
		private readonly events: EventRegistry,
		private readonly commander: CommandRegistry
	) {
		super();
		this.console = new WrappedTerminalConsole(this.name);
		this.entryFilePath = resolve(PLUGIN_ROOT, name, 'entry.js');
		this._register({
			dispose: () => {
				return this.stop();
			},
		});
	}

	async reload() {
		this.console.log('重新加载');
		this._stop();
		const instance = new PluginInstance(this.console, this.entryFilePath, this.events, this.commander);
		this.instance = instance;
		instance.onBeforeDispose(() => {
			if (this.instance === instance) {
				delete this.instance;
			}
		});
	}

	stop() {
		this.console.log('卸载');
		return this._stop();
	}

	async _stop() {
		if (this.instance) {
			await this.instance.stop();
			this.console.assert(this.instance === undefined, 'instance should delete by onBeforeDispose');
		}
	}
}

class PluginInstance extends Disposable {
	public readonly childProcess: ExecaChildProcess;

	constructor(
		private readonly console: WrappedTerminalConsole,
		entryFile: string,
		events: EventRegistry,
		private readonly commander: CommandRegistry
	) {
		super();
		this.childProcess = node(entryFile, [], {
			stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
			windowsHide: true,
			cleanup: true,
			cwd: dirname(entryFile),
		});
		this.childProcess.on('exit', (code, signal) => {
			this.console.error('意外退出 返回值=%s 信号=%s', code, signal);
			this.dispose();
		});
		this.childProcess.on('message', this.recv.bind(this));
		this.send({ kind: 'lifecycle', action: IPCMessageLifecycleAction.Start });
	}

	send(message: IPCServerMessage) {
		const success = this.childProcess.send({ ...message, __qqbot_ipc_message: true });
		if (!success) {
			this.console.error('未能发出消息（该消息内容为：%s）', message);
		}
	}
	recv(data: any) {
		if (!data || !data.__qqbot_ipc_message) {
			return;
		}
		const message: IPCClientMessage = data;

		let p: Promise<void>;
		if (IPCMessage.isCommand(message)) {
			const key: any = QQEvent[message.event];
			p = this.commander[key](message.payload);
		} else if (IPCMessage.isEventControl(message)) {
		} else {
			this.console.error('收到未知的IPC消息类型：%s', message);
		}
	}

	async stop() {
		this.childProcess.removeAllListeners('exit');
		this.childProcess.send({ action: 'stop' });
		this.console.log('stop:');
		try {
			await Promise.race([this.childProcess.catch(), timeout(5000)]);
		} catch (e) {
			this.console.error('发送退出命令后5秒没有响应，杀死进程。');
			this.childProcess.kill('SIGKILL');
		}
		this.dispose();
		this.console.log('实例已销毁');
	}
}
