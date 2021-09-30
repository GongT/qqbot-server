import { ChildProcess } from 'child_process';

export class IpcChannelServer {
	constructor(protected readonly process: ChildProcess) {}

	triggerEvent() {}

	onHandle() {}
}
