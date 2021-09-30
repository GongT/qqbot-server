import { QQCommand, QQEvent } from '../protocol/enum';

export enum IPCMessageEventControlAction {
	EnableListen,
	DisableListen,
}

export interface IPCMessageEventControl {
	kind: 'event-manage';
	action: IPCMessageEventControlAction;
	event: QQEvent;
}
export interface IPCMessageEvent {
	kind: 'event';
	event: QQEvent;
	payload: any;
}

export interface IPCMessageCommand {
	kind: 'command';
	event: QQCommand;
	payload: any;
}

export enum IPCMessageLifecycleAction {
	Start,
	Stop,
}

export interface IPCMessageLifecycle {
	kind: 'lifecycle';
	action: IPCMessageLifecycleAction;
}

export interface IPCMessageAck {
	kind: 'ack';
}

export type IPCServerMessage = IPCMessageAck | IPCMessageEvent | IPCMessageLifecycle;

export type IPCClientMessage = IPCMessageWithId & (IPCMessageCommand | IPCMessageEventControl);

interface IPCMessageWithId {
	__id: string;
}

export namespace IPCMessage {
	export function isEventControl(t: IPCClientMessage): t is IPCMessageEventControl & IPCMessageWithId {
		return t.kind === 'event-manage';
	}

	export function isEvent(t: IPCServerMessage): t is IPCMessageEvent {
		return t.kind === 'event';
	}

	export function isCommand(t: IPCClientMessage): t is IPCMessageCommand & IPCMessageWithId {
		return t.kind === 'command';
	}

	export function isLifecycle(t: IPCServerMessage): t is IPCMessageLifecycle {
		return t.kind === 'lifecycle';
	}

	export function isAck(t: IPCServerMessage): t is IPCMessageAck {
		return t.kind === 'ack';
	}
}
