import { WrappedTerminalConsole } from '@gongt/qqbot';
import { watch } from 'chokidar';
import debounce from 'debounce';
import { PLUGIN_ROOT } from './constants';
import { MiraiWebsocketClient } from './internal/client';
import { PluginsHost } from './internal/plugin';

const console = new WrappedTerminalConsole('main');

async function main() {
	console.log('插件根目录 %s', PLUGIN_ROOT);

	const client = new MiraiWebsocketClient({
		address: { server: 'server', port: '56080' },
		sessionKey: 'SINGLE_SESSION',
		reservedSyncId: '-1',
	});
	await client.connect();

	const watcher = watch('**/*.js', {
		cwd: PLUGIN_ROOT,
		ignoreInitial: false,
		followSymlinks: false,
		usePolling: false,
		ignored: ['*/.*'],
	});

	watcher.on('error', (e) => {
		console.error('FSWatch ' + e.message);
	});

	const pluginsController = new PluginsHost(client);
	const changefn = debounce(pluginsController.changeEventHandler, 3000, false);
	watcher.on('add', changefn);
	watcher.on('change', changefn);
	watcher.on('unlink', changefn);

	// client.events.onGroupMessage((data) => {
	// 	console.log(data.sender.memberName, '说:', data.messageChain);
	// });

	// await client.commander.sendGroupMessage({
	// 	target: 24446565,
	// 	messageChain: [
	// 		{ type: 'Plain', text: 'hello\n' },
	// 		{ type: 'Plain', text: 'world' },
	// 		{ type: 'Image', url: 'https://i0.hdslb.com/bfs/album/67fc4e6b417d9c68ef98ba71d5e79505bbad97a1.png' },
	// 	],
	// });
}

main().catch((e) => {
	console.error(e);
});
