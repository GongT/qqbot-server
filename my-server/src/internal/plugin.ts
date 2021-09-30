import { exists } from '@idlebox/node';
import AsyncLock from 'async-lock';
import { MiraiWebsocketClient } from './client';
import { Plugin } from './processControl';

export class PluginsHost {
	private readonly pluginsRegistry = new Map<string, Plugin>();
	private readonly lock = new AsyncLock();

	constructor(private readonly client: MiraiWebsocketClient) {
		this.changeEventHandler = this.changeEventHandler.bind(this);
	}

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
			const plugin = new Plugin(changedFolder, this.client.events, this.client.commander);
			if (await exists(plugin.entryFilePath)) {
				this.pluginsRegistry.set(plugin.name, plugin);
				changed.add(plugin);
			}
		}

		for (const item of changed) {
			await item.reload();
		}
		for (const item of changed) {
			await item.stop();
		}
	}

	public changeEventHandler(filename: string) {
		this.lock
			.acquire('change', async () => {
				return this.onChange(filename);
			})
			.catch((e) => {
				console.error('change event %s', e.stack);
			});
	}
}
