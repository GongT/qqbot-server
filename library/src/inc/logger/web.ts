import { WrappedConsole, WrappedConsoleOptions } from './base';

interface WebConsoleOptions {
	color?: boolean;
}

const colorMap = {
	info: 'color:blue',
	success: 'color:green',
	debug: 'color:gray',
	error: 'color:red',
	trace: 'color:gray',
	warn: 'color:yellow',
	assert: 'background:red;color:white',
};

export class WebTerminalConsole extends WrappedConsole {
	private readonly colors: Record<string, string> = colorMap;

	constructor(title: string, { color, ...opt }: WrappedConsoleOptions & WebConsoleOptions = {}) {
		super(title, opt);
		if (color === false) {
			this.colors = {};
		} else if (color === undefined) {
			if (!process.stderr.isTTY || !process.stdout.isTTY) {
				this.colors = {};
			}
		}
	}

	protected processColorLabel(msg: any[], pos: number, level: string, prefix: string): void {
		if (this.colors[level]) {
			msg.splice(pos, 1, `%c${prefix}${msg[pos]}`, this.colors[level]);
		} else {
			msg[pos] = `${prefix}${msg[pos]}`;
		}
	}
}
