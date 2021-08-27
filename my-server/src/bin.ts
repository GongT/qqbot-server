import { MiraiWebsocketClient } from '@gongt/qqbot-server';

async function main() {
	const client = new MiraiWebsocketClient({
		address: { server: 'server', port: '56080' },
		sessionKey: 'SINGLE_SESSION',
		reservedSyncId: '-1',
	});
	await client.connect();

	client.events.onGroupMessage((data) => {
		console.log(data.sender.memberName, '说:', data.messageChain);
	});

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
