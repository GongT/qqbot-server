import { EventRegister } from '@idlebox/common';
import { QQEvent } from './enum';
import type { QQFriendMessage, QQGroupMessage, QQSyncMessage, TODO } from './types';

type _EventRegistry = {
	[Property in keyof typeof QQEvent as `on${Capitalize<Property>}`]: EventRegister<any>;
};

export interface EventRegistry extends _EventRegistry {
	readonly onBotOnline: EventRegister<TODO>; // Bot登录成功
	readonly onBotOfflineActive: EventRegister<TODO>; // Bot主动离线
	readonly onBotOfflineForce: EventRegister<TODO>; // Bot被挤下线
	readonly onBotOfflineDropped: EventRegister<TODO>; // Bot被服务器断开或因网络问题而掉线
	readonly onBotRelogin: EventRegister<TODO>; // Bot主动重新登录
	readonly onFriendInputStatusChanged: EventRegister<TODO>; // 好友输入状态改变
	readonly onFriendNickChanged: EventRegister<TODO>; // 好友昵称改变
	readonly onBotGroupPermissionChange: EventRegister<TODO>; // Bot在群里的权限被改变
	readonly onBotMute: EventRegister<TODO>; // Bot被禁言
	readonly onBotUnmute: EventRegister<TODO>; // Bot被取消禁言
	readonly onBotJoinGroup: EventRegister<TODO>; // Bot加入了一个新群
	readonly onBotLeaveActive: EventRegister<TODO>; // Bot主动退出一个群
	readonly onBotLeaveKick: EventRegister<TODO>; // Bot被踢出一个群
	readonly onGroupRecall: EventRegister<TODO>; // 群消息撤回
	readonly onFriendRecall: EventRegister<TODO>; // 好友消息撤回
	readonly onNudge: EventRegister<TODO>; // 戳一戳事件
	readonly onGroupNameChange: EventRegister<TODO>; // 某个群名改变
	readonly onGroupEntranceAnnouncementChange: EventRegister<TODO>; // 某群入群公告改变
	readonly onGroupMuteAll: EventRegister<TODO>; // 全员禁言
	readonly onGroupAllowAnonymousChat: EventRegister<TODO>; // 匿名聊天
	readonly onGroupAllowConfessTalk: EventRegister<TODO>; // 坦白说
	readonly onGroupAllowMemberInvite: EventRegister<TODO>; // 允许群员邀请好友加群
	readonly onMemberJoin: EventRegister<TODO>; // 新人入群的事件
	readonly onMemberLeaveKick: EventRegister<TODO>; // 成员被踢出群
	readonly onMemberLeaveQuit: EventRegister<TODO>; // 成员主动离群
	readonly onMemberCardChange: EventRegister<TODO>; // 群名片改动
	readonly onMemberSpecialTitleChange: EventRegister<TODO>; // 群头衔改动
	readonly onMemberPermissionChange: EventRegister<TODO>; // 成员权限改变的事件（该成员不是Bot）
	readonly onMemberMute: EventRegister<TODO>; // 群成员被禁言事件（该成员不是Bot）
	readonly onMemberUnmute: EventRegister<TODO>; // 群成员被取消禁言事件（该成员不是Bot）
	readonly onMemberHonorChange: EventRegister<TODO>; // 群员称号改变
	readonly onNewFriendRequest: EventRegister<TODO>; // 添加好友申请
	readonly onMemberJoinRequest: EventRegister<TODO>; // 用户入群申请（Bot需要有管理员权限）
	readonly onBotInvitedJoinGroupRequest: EventRegister<TODO>; // Bot被邀请入群申请
	readonly onCommandExecuted: EventRegister<TODO>; // 命令被执行

	readonly onFriendMessage: EventRegister<QQFriendMessage>; // 好友消息
	readonly onGroupMessage: EventRegister<QQGroupMessage>; // 群消息
	readonly onTempMessage: EventRegister<QQGroupMessage>; // 群临时消息
	readonly onStrangerMessage: EventRegister<QQFriendMessage>; // 陌生人消息
	readonly onOtherClientMessage: EventRegister<QQSyncMessage>; // 其他客户端消息
}
