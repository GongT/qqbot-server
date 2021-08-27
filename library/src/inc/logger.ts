import { nameFunction } from '@idlebox/common';

export class WrappedConsole {
	public declare info: Console['info'];
	public declare log: Console['log'];
	public declare success: Console['log'];
	public declare debug: Console['debug'];
	public declare error: Console['error'];
	public declare trace: Console['trace'];
	public declare warn: Console['warn'];
	public declare assert: Console['assert'];

	public declare time: Console['time'];
	public declare timeEnd: Console['timeEnd'];
	public declare timeLog: Console['timeLog'];
	public declare count: Console['count'];
	public declare countReset: Console['countReset'];
	public declare group: Console['group'];
	public declare groupCollapsed: Console['groupCollapsed'];
	public declare groupEnd: Console['groupEnd'];

	public declare table: Console['table'];
	public declare dir: Console['dir'];
	public declare clear: Console['clear'];

	constructor(private readonly title: string, private parent: Console = console, private bind = false) {
		this.info = this.wrapMessageAt(parent.info, 0, undefined, 14);
		this.log = this.wrapMessageAt(parent.log, 0);
		this.success = this.wrapMessageAt(parent.log, 0, undefined, 10);
		this.debug = this.wrapMessageAt(parent.debug, 0, undefined, '255;2');
		this.error = this.wrapMessageAt(parent.error, 0, undefined, 9);
		this.trace = this.wrapMessageAt(parent.trace, 0, undefined, '255;2');
		this.warn = this.wrapMessageAt(parent.warn, 0, undefined, 11);
		this.assert = this.wrapMessageAt(parent.assert, 1, undefined, '9;7');

		this.time = this.wrapMessageAt(parent.time, 0);
		this.timeEnd = this.wrapMessageAt(parent.timeEnd, 0);
		this.timeLog = this.wrapMessageAt(parent.timeLog, 0);
		this.count = this.wrapMessageAt(parent.count, 0);
		this.countReset = this.wrapMessageAt(parent.countReset, 0);
		this.group = this.wrapMessageAt(parent.group, 0);
		this.groupCollapsed = this.wrapMessageAt(parent.groupCollapsed, 0);

		this.groupEnd = this.wrapSimple(parent.groupEnd);
		this.table = this.wrapSimple(parent.table);
		this.dir = this.wrapSimple(parent.dir);
		this.clear = this.wrapSimple(parent.clear);
	}

	private wrapSimple<T extends Function>(original: T) {
		if (this.bind) {
			return original.bind(this.parent);
		} else {
			return original;
		}
	}

	private wrapMessageAt<T extends Function>(
		original: T,
		messageLoc: number,
		additionalPrefix?: string,
		color?: number | string
	): T {
		let prefix = `[${this.title}]`,
			postfix = '';
		if (additionalPrefix) {
			prefix += `[${additionalPrefix}] `;
		} else {
			prefix += ' ';
		}
		if (color) {
			prefix = `\x1B[38;5;${color}m${prefix}`;
			postfix = `\x1B[0m`;
		}

		if (this.bind) {
			original = original.bind(this.parent);
		}

		return nameFunction('console.' + original.name, (...args: any[]) => {
			this.processLabel(args, messageLoc, prefix, postfix);
			original(...args);
		}) as unknown as any;
	}

	private processLabel(args: any[], pos: number, prefix: string, postfix: string) {
		const msg = args[pos];
		if (typeof msg === 'string') {
			args[pos] = prefix + msg + postfix;
		} else if (msg) {
			args.splice(pos, 0, prefix + '%s' + postfix);
		} else {
			args.splice(pos, 0, prefix + postfix);
		}
	}
}
