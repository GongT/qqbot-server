import { resolve } from 'path';
import { exists } from '@idlebox/node';
import { AsyncDisposable } from '@idlebox/common';
import { PLUGIN_ROOT } from './constants';
import AsyncLock from 'async-lock';

export class PluginsController {
	private readonly pluginsRegistry = new Map<string, Plugin>();
	private readonly lock = new AsyncLock();

	constructor() {}

	public async onChange(filename: string) {
		const changed = new Set<Plugin>();
		const deleted = new Set<Plugin>();

		const changedFolder = filename.substr(0, filename.indexOf('/'));
		if (this.pluginsRegistry.has(changedFolder)) {
			const plugin = this.pluginsRegistry.get(changedFolder)!;
			if (await exists(plugin.entryFilePath)) {
				changed.add(plugin);
			} else {
				this.pluginsRegistry.delete(plugin.name);
				deleted.add(plugin);
			}
		} else {
			const plugin = new Plugin(changedFolder);
			if (await exists(plugin.entryFilePath)) {
				this.pluginsRegistry.set(plugin.name, plugin);
				changed.add(plugin);
			}
		}

		for (const item of changed) {
			await item.reload();
		}
		for (const item of changed) {
			await item.dispose();
		}
	}

	public changeEventHandler(_type: 'add' | 'change' | 'unlink', filename: string) {
		this.lock
			.acquire('change', async () => {
				return this.onChange(filename);
			})
			.catch((e) => {
				console.error('change event %s', e.stack);
			});
	}
}

class Plugin extends AsyncDisposable {
	public readonly entryFilePath: string;

	constructor(public readonly name: string) {
		super();
		this.entryFilePath = resolve(PLUGIN_ROOT, name, 'entry.js');
	}

	async reload() {}
}
