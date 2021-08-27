import { CanceledError, DeferredPromise, TimeoutError } from '@idlebox/common';

interface IState {
	dfd: DeferredPromise<any>;
	timeout: number;
}

export class PromiseList {
	private readonly promiseList: Record<string, IState> = {};
	private timer?: NodeJS.Timeout;

	constructor(private readonly defaultTimeoutMs = 50000) {}

	create(id: string, timeoutMs: number = this.defaultTimeoutMs) {
		const dfd = new DeferredPromise<any>();
		this.promiseList[id] = {
			dfd,
			timeout: Date.now() + timeoutMs,
		};
		return dfd.p;
	}

	has(id: string) {
		return this.promiseList.hasOwnProperty(id);
	}

	done(id: string, data: any) {
		this.promiseList[id].dfd.complete(data);
		delete this.promiseList[id];
	}

	enableTimeout() {
		if (this.timer) {
			throw new Error('promise timeout timer already set');
		}
		this.timer = setInterval(() => {
			const now = Date.now();
			for (const [key, { dfd, timeout }] of Object.entries(this.promiseList)) {
				if (timeout < now) {
					delete this.promiseList[key];
					dfd.error(new TimeoutError(timeout, 'mirai server did not response'));
				}
			}
		}, this.defaultTimeoutMs / 2);
	}

	disableTimeout() {
		if (!this.timer) return;
		clearInterval(this.timer);
		delete this.timer;
	}

	clear() {
		this.disableTimeout();
		for (const [key, { dfd }] of Object.entries(this.promiseList)) {
			dfd.error(new CanceledError());
			delete this.promiseList[key];
		}
	}

	dispose() {
		this.clear();
	}
}
