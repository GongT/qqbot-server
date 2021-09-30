import { QQCommand } from './enum';
import { TODO } from './types';

interface ICommandCallback<IT, OT> {
	(data: IT): Promise<OT>;
}

type _CommandRegistry = {
	[Property in keyof typeof QQCommand as Uncapitalize<Property>]: ICommandCallback<unknown, unknown>;
};

export interface CommandRegistry extends _CommandRegistry {
	about: (input: TODO) => Promise<TODO>; // 获取插件信息
	messageFromId: (input: TODO) => Promise<TODO>; // 通过messageId获取消息 | 此方法通过 messageId 获取历史消息, 历史消息的缓存有容量大小, 在配置文件中设置
	friendList: (input: TODO) => Promise<TODO>; // 获取好友列表 | 使用此方法获取bot的好友列表
	groupList: (input: TODO) => Promise<TODO>; // 获取群列表 | 使用此方法获取bot的群列表
	memberList: (input: TODO) => Promise<TODO>; // 获取群成员列表 | 使用此方法获取bot指定群中的成员列表
	botProfile: (input: TODO) => Promise<TODO>; // 获取Bot资料 | 此接口获取 session 绑定 bot 的详细资料
	friendProfile: (input: TODO) => Promise<TODO>; // 获取好友资料 | 此接口获取好友的详细资料
	memberProfile: (input: TODO) => Promise<TODO>; // 获取群成员资料 | 此接口获取群成员的消息资料
	sendFriendMessage: (input: TODO) => Promise<TODO>; // 发送好友消息 | 使用此方法向指定好友发送消息
	sendGroupMessage: (input: TODO) => Promise<TODO>; // 发送群消息
	sendTempMessage: (input: TODO) => Promise<TODO>; // 发送临时会话消息
	sendNudge: (input: TODO) => Promise<TODO>; // 发送头像戳一戳消息
	recall: (input: TODO) => Promise<TODO>; // 撤回消息
	fileList: (input: TODO) => Promise<TODO>; // 查看文件列表
	fileInfo: (input: TODO) => Promise<TODO>; // 获取文件信息
	fileMkdir: (input: TODO) => Promise<TODO>; // 创建文件夹
	fileDelete: (input: TODO) => Promise<TODO>; // 删除文件
	fileMove: (input: TODO) => Promise<TODO>; // 移动文件
	fileRename: (input: TODO) => Promise<TODO>; // 重命名文件
	deleteFriend: (input: TODO) => Promise<TODO>; // 删除好友 | 使用此方法删除指定好友
	mute: (input: TODO) => Promise<TODO>; // 禁言群成员 | 使用此方法指定群禁言指定群员（需要有相关限权）
	unmute: (input: TODO) => Promise<TODO>; // 解除群成员禁言 | 使用此方法指定群解除群成员禁言（需要有相关限权）
	kick: (input: TODO) => Promise<TODO>; // 移除群成员 | 使用此方法移除指定群成员（需要有相关限权）
	quit: (input: TODO) => Promise<TODO>; // 退出群聊 | 使用此方法使Bot退出群聊
	muteAll: (input: TODO) => Promise<TODO>; // 全体禁言 | 使用此方法令指定群进行全体禁言（需要有相关限权）
	unmuteAll: (input: TODO) => Promise<TODO>; // 解除全体禁言 | 使用此方法令指定群解除全体禁言（需要有相关限权）
	setEssence: (input: TODO) => Promise<TODO>; // 设置群精华消息 | 使用此方法添加一条消息为精华消息（需要有相关限权）
	getGroupConfig: (input: TODO) => Promise<TODO>; // 获取群设置 | 使用此方法获取群设置
	updateGroupConfig: (input: TODO) => Promise<TODO>; // 修改群设置 | 使用此方法修改群设置（需要有相关限权）
	getMemberInfo: (input: TODO) => Promise<TODO>; // 获取群员设置 | 使用此方法获取群员设置
	updateMemberInfo: (input: TODO) => Promise<TODO>; // 修改群员设置 | 使用此方法修改群员设置（需要有相关限权）
	respNewFriendRequestEvent: (input: TODO) => Promise<TODO>; // 添加好友申请 | 使用此方法处理添加好友申请
	respMemberJoinRequestEvent: (input: TODO) => Promise<TODO>; // 用户入群申请 | 使用此方法处理用户入群申请
	respBotInvitedJoinGroupRequestEvent: (input: TODO) => Promise<TODO>; // Bot被邀请入群申请 | 使用此方法处理Bot被邀请入群申请
}
