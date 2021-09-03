import { definePublicConstant, Disposable, Emitter, EventRegister, ucfirst } from '@idlebox/common';
import { QQEvent } from './enum';
import { WrappedTerminalConsole } from './logger/terminal';
import type { QQFriendMessage, QQGroupMessage, QQSyncMessage } from './types';

const console = new WrappedTerminalConsole('Events');

type EventRegistry = {
	[Property in keyof typeof QQEvent as `on${Capitalize<Property>}`]: EventRegister<any>;
};

// @ts-ignore
type TODO = unknown;

export class Events extends Disposable implements EventRegistry {
	private readonly events: Record<string, Emitter<any>> = {};
	private readonly _onUnknownType = this._register(new Emitter<any>());
	public readonly onUnknownType = this._onUnknownType.register;

	public declare readonly onBotOnline: EventRegister<TODO>; // Bot登录成功
	public declare readonly onBotOfflineActive: EventRegister<TODO>; // Bot主动离线
	public declare readonly onBotOfflineForce: EventRegister<TODO>; // Bot被挤下线
	public declare readonly onBotOfflineDropped: EventRegister<TODO>; // Bot被服务器断开或因网络问题而掉线
	public declare readonly onBotRelogin: EventRegister<TODO>; // Bot主动重新登录
	public declare readonly onFriendInputStatusChanged: EventRegister<TODO>; // 好友输入状态改变
	public declare readonly onFriendNickChanged: EventRegister<TODO>; // 好友昵称改变
	public declare readonly onBotGroupPermissionChange: EventRegister<TODO>; // Bot在群里的权限被改变
	public declare readonly onBotMute: EventRegister<TODO>; // Bot被禁言
	public declare readonly onBotUnmute: EventRegister<TODO>; // Bot被取消禁言
	public declare readonly onBotJoinGroup: EventRegister<TODO>; // Bot加入了一个新群
	public declare readonly onBotLeaveActive: EventRegister<TODO>; // Bot主动退出一个群
	public declare readonly onBotLeaveKick: EventRegister<TODO>; // Bot被踢出一个群
	public declare readonly onGroupRecall: EventRegister<TODO>; // 群消息撤回
	public declare readonly onFriendRecall: EventRegister<TODO>; // 好友消息撤回
	public declare readonly onNudge: EventRegister<TODO>; // 戳一戳事件
	public declare readonly onGroupNameChange: EventRegister<TODO>; // 某个群名改变
	public declare readonly onGroupEntranceAnnouncementChange: EventRegister<TODO>; // 某群入群公告改变
	public declare readonly onGroupMuteAll: EventRegister<TODO>; // 全员禁言
	public declare readonly onGroupAllowAnonymousChat: EventRegister<TODO>; // 匿名聊天
	public declare readonly onGroupAllowConfessTalk: EventRegister<TODO>; // 坦白说
	public declare readonly onGroupAllowMemberInvite: EventRegister<TODO>; // 允许群员邀请好友加群
	public declare readonly onMemberJoin: EventRegister<TODO>; // 新人入群的事件
	public declare readonly onMemberLeaveKick: EventRegister<TODO>; // 成员被踢出群
	public declare readonly onMemberLeaveQuit: EventRegister<TODO>; // 成员主动离群
	public declare readonly onMemberCardChange: EventRegister<TODO>; // 群名片改动
	public declare readonly onMemberSpecialTitleChange: EventRegister<TODO>; // 群头衔改动
	public declare readonly onMemberPermissionChange: EventRegister<TODO>; // 成员权限改变的事件（该成员不是Bot）
	public declare readonly onMemberMute: EventRegister<TODO>; // 群成员被禁言事件（该成员不是Bot）
	public declare readonly onMemberUnmute: EventRegister<TODO>; // 群成员被取消禁言事件（该成员不是Bot）
	public declare readonly onMemberHonorChange: EventRegister<TODO>; // 群员称号改变
	public declare readonly onNewFriendRequest: EventRegister<TODO>; // 添加好友申请
	public declare readonly onMemberJoinRequest: EventRegister<TODO>; // 用户入群申请（Bot需要有管理员权限）
	public declare readonly onBotInvitedJoinGroupRequest: EventRegister<TODO>; // Bot被邀请入群申请
	public declare readonly onCommandExecuted: EventRegister<TODO>; // 命令被执行

	public declare readonly onFriendMessage: EventRegister<QQFriendMessage>; // 好友消息
	public declare readonly onGroupMessage: EventRegister<QQGroupMessage>; // 群消息
	public declare readonly onTempMessage: EventRegister<QQGroupMessage>; // 群临时消息
	public declare readonly onStrangerMessage: EventRegister<QQFriendMessage>; // 陌生人消息
	public declare readonly onOtherClientMessage: EventRegister<QQSyncMessage>; // 其他客户端消息

	constructor() {
		super();
		for (const [localName, netName] of Object.entries(QQEvent)) {
			this.events[netName] = this._register(new Emitter());
			// console.debug('event type %s trigger %s', netName, 'on' + ucfirst(localName));
			definePublicConstant(this, 'on' + ucfirst(localName), this.events[netName].register);
		}
	}

	public handleIncommingEvent(input: any) {
		const { type, ...extra } = input;
		if (!type) {
			console.error('event has no type: %s', input);
			return;
		}
		console.debug('event: %s -> %s', type, extra);
		if (this.events[type]) {
			this.events[type].fireNoError(extra);
		} else {
			this._onUnknownType.fireNoError(input);
		}
	}
}
