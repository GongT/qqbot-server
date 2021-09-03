import { definePublicConstant, lcfirst, nameFunction } from '@idlebox/common';
import { MiraiWebsocketClient } from '../index';
import { QQCommand } from './enum';

// const console = new WrappedTerminalConsole('Commander');

type CommandRegistry = {
	[Property in keyof typeof QQCommand as Uncapitalize<Property>]: ICommandCallback<unknown, unknown>;
};

interface ICommandCallback<IT, OT> {
	(data: IT): Promise<OT>;
}

// @ts-ignore
type TODO = unknown;

export class MiraiClientCommander implements CommandRegistry {
	private increament: number = 0;

	public declare about: (input: TODO) => Promise<TODO>; // 获取插件信息
	public declare messageFromId: (input: TODO) => Promise<TODO>; // 通过messageId获取消息 | 此方法通过 messageId 获取历史消息, 历史消息的缓存有容量大小, 在配置文件中设置
	public declare friendList: (input: TODO) => Promise<TODO>; // 获取好友列表 | 使用此方法获取bot的好友列表
	public declare groupList: (input: TODO) => Promise<TODO>; // 获取群列表 | 使用此方法获取bot的群列表
	public declare memberList: (input: TODO) => Promise<TODO>; // 获取群成员列表 | 使用此方法获取bot指定群中的成员列表
	public declare botProfile: (input: TODO) => Promise<TODO>; // 获取Bot资料 | 此接口获取 session 绑定 bot 的详细资料
	public declare friendProfile: (input: TODO) => Promise<TODO>; // 获取好友资料 | 此接口获取好友的详细资料
	public declare memberProfile: (input: TODO) => Promise<TODO>; // 获取群成员资料 | 此接口获取群成员的消息资料
	public declare sendFriendMessage: (input: TODO) => Promise<TODO>; // 发送好友消息 | 使用此方法向指定好友发送消息
	public declare sendGroupMessage: (input: TODO) => Promise<TODO>; // 发送群消息
	public declare sendTempMessage: (input: TODO) => Promise<TODO>; // 发送临时会话消息
	public declare sendNudge: (input: TODO) => Promise<TODO>; // 发送头像戳一戳消息
	public declare recall: (input: TODO) => Promise<TODO>; // 撤回消息
	public declare fileList: (input: TODO) => Promise<TODO>; // 查看文件列表
	public declare fileInfo: (input: TODO) => Promise<TODO>; // 获取文件信息
	public declare fileMkdir: (input: TODO) => Promise<TODO>; // 创建文件夹
	public declare fileDelete: (input: TODO) => Promise<TODO>; // 删除文件
	public declare fileMove: (input: TODO) => Promise<TODO>; // 移动文件
	public declare fileRename: (input: TODO) => Promise<TODO>; // 重命名文件
	public declare deleteFriend: (input: TODO) => Promise<TODO>; // 删除好友 | 使用此方法删除指定好友
	public declare mute: (input: TODO) => Promise<TODO>; // 禁言群成员 | 使用此方法指定群禁言指定群员（需要有相关限权）
	public declare unmute: (input: TODO) => Promise<TODO>; // 解除群成员禁言 | 使用此方法指定群解除群成员禁言（需要有相关限权）
	public declare kick: (input: TODO) => Promise<TODO>; // 移除群成员 | 使用此方法移除指定群成员（需要有相关限权）
	public declare quit: (input: TODO) => Promise<TODO>; // 退出群聊 | 使用此方法使Bot退出群聊
	public declare muteAll: (input: TODO) => Promise<TODO>; // 全体禁言 | 使用此方法令指定群进行全体禁言（需要有相关限权）
	public declare unmuteAll: (input: TODO) => Promise<TODO>; // 解除全体禁言 | 使用此方法令指定群解除全体禁言（需要有相关限权）
	public declare setEssence: (input: TODO) => Promise<TODO>; // 设置群精华消息 | 使用此方法添加一条消息为精华消息（需要有相关限权）
	public declare getGroupConfig: (input: TODO) => Promise<TODO>; // 获取群设置 | 使用此方法获取群设置
	public declare updateGroupConfig: (input: TODO) => Promise<TODO>; // 修改群设置 | 使用此方法修改群设置（需要有相关限权）
	public declare getMemberInfo: (input: TODO) => Promise<TODO>; // 获取群员设置 | 使用此方法获取群员设置
	public declare updateMemberInfo: (input: TODO) => Promise<TODO>; // 修改群员设置 | 使用此方法修改群员设置（需要有相关限权）
	public declare respNewFriendRequestEvent: (input: TODO) => Promise<TODO>; // 添加好友申请 | 使用此方法处理添加好友申请
	public declare respMemberJoinRequestEvent: (input: TODO) => Promise<TODO>; // 用户入群申请 | 使用此方法处理用户入群申请
	public declare respBotInvitedJoinGroupRequestEvent: (input: TODO) => Promise<TODO>; // Bot被邀请入群申请 | 使用此方法处理Bot被邀请入群申请

	constructor(private client: MiraiWebsocketClient) {
		for (const [localName, cmd] of Object.entries(QQCommand)) {
			const callName = lcfirst(localName);
			const [main, sub] = cmd.split('+');

			// console.debug('define %s() as', callName, main, sub);
			definePublicConstant(
				this,
				callName,
				nameFunction(callName, (input: any) => {
					return this._send(main, sub, input);
				})
			);
		}
	}

	protected _send(cmd: string, sub: string | null, data: any): Promise<any> {
		this.increament++;
		const id = `cmd:${this.increament}`;
		const p = this.client.createPromise(id);
		this.client._sendRaw(id, cmd, sub, data);
		return p;
	}
}
