export enum QQCommand {
	// https://github.com/project-mirai/mirai-api-http/blob/master/docs/adapter/WebsocketAdapter.md
	About = 'about', // 获取插件信息
	MessageFromId = 'messageFromId', // 通过messageId获取消息 | 此方法通过 messageId 获取历史消息, 历史消息的缓存有容量大小, 在配置文件中设置
	FriendList = 'friendList', // 获取好友列表 | 使用此方法获取bot的好友列表
	GroupList = 'groupList', // 获取群列表 | 使用此方法获取bot的群列表
	MemberList = 'memberList', // 获取群成员列表 | 使用此方法获取bot指定群中的成员列表
	BotProfile = 'botProfile', // 获取Bot资料 | 此接口获取 session 绑定 bot 的详细资料
	FriendProfile = 'friendProfile', // 获取好友资料 | 此接口获取好友的详细资料
	MemberProfile = 'memberProfile', // 获取群成员资料 | 此接口获取群成员的消息资料
	SendFriendMessage = 'sendFriendMessage', // 发送好友消息 | 使用此方法向指定好友发送消息
	SendGroupMessage = 'sendGroupMessage', // 发送群消息
	SendTempMessage = 'sendTempMessage', // 发送临时会话消息
	SendNudge = 'sendNudge', // 发送头像戳一戳消息
	Recall = 'recall', // 撤回消息
	FileList = 'file_list', // 查看文件列表
	FileInfo = 'file_info', // 获取文件信息
	FileMkdir = 'file_mkdir', // 创建文件夹
	FileDelete = 'file_delete', // 删除文件
	FileMove = 'file_move', // 移动文件
	FileRename = 'file_rename', // 重命名文件
	DeleteFriend = 'deleteFriend', // 删除好友 | 使用此方法删除指定好友
	Mute = 'mute', // 禁言群成员 | 使用此方法指定群禁言指定群员（需要有相关限权）
	Unmute = 'unmute', // 解除群成员禁言 | 使用此方法指定群解除群成员禁言（需要有相关限权）
	Kick = 'kick', // 移除群成员 | 使用此方法移除指定群成员（需要有相关限权）
	Quit = 'quit', // 退出群聊 | 使用此方法使Bot退出群聊
	MuteAll = 'muteAll', // 全体禁言 | 使用此方法令指定群进行全体禁言（需要有相关限权）
	UnmuteAll = 'unmuteAll', // 解除全体禁言 | 使用此方法令指定群解除全体禁言（需要有相关限权）
	SetEssence = 'setEssence', // 设置群精华消息 | 使用此方法添加一条消息为精华消息（需要有相关限权）
	GetGroupConfig = 'groupConfig+get', // 获取群设置 | 使用此方法获取群设置
	UpdateGroupConfig = 'groupConfig+update', // 修改群设置 | 使用此方法修改群设置（需要有相关限权）
	GetMemberInfo = 'memberInfo+get', // 获取群员设置 | 使用此方法获取群员设置
	UpdateMemberInfo = 'memberInfo+update', // 修改群员设置 | 使用此方法修改群员设置（需要有相关限权）
	RespNewFriendRequestEvent = 'resp_newFriendRequestEvent', // 添加好友申请 | 使用此方法处理添加好友申请
	RespMemberJoinRequestEvent = 'resp_memberJoinRequestEvent', // 用户入群申请 | 使用此方法处理用户入群申请
	RespBotInvitedJoinGroupRequestEvent = 'resp_botInvitedJoinGroupRequestEvent', // Bot被邀请入群申请 | 使用此方法处理Bot被邀请入群申请
}

export enum QQMessageType {}
// https://github.com/project-mirai/mirai-api-http/blob/master/docs/api/MessageType.md

export enum QQEvent {
	// https://github.com/project-mirai/mirai-api-http/blob/master/docs/api/EventType.md
	BotOnline = 'BotOnlineEvent', // Bot登录成功
	BotOfflineActive = 'BotOfflineEventActive', // Bot主动离线
	BotOfflineForce = 'BotOfflineEventForce', // Bot被挤下线
	BotOfflineDropped = 'BotOfflineEventDropped', // Bot被服务器断开或因网络问题而掉线
	BotRelogin = 'BotReloginEvent', // Bot主动重新登录
	FriendInputStatusChanged = 'FriendInputStatusChangedEvent', // 好友输入状态改变
	FriendNickChanged = 'FriendNickChangedEvent', // 好友昵称改变
	BotGroupPermissionChange = 'BotGroupPermissionChangeEvent', // Bot在群里的权限被改变
	BotMute = 'BotMuteEvent', // Bot被禁言
	BotUnmute = 'BotUnmuteEvent', // Bot被取消禁言
	BotJoinGroup = 'BotJoinGroupEvent', // Bot加入了一个新群
	BotLeaveActive = 'BotLeaveEventActive', // Bot主动退出一个群
	BotLeaveKick = 'BotLeaveEventKick', // Bot被踢出一个群
	GroupRecall = 'GroupRecallEvent', // 群消息撤回
	FriendRecall = 'FriendRecallEvent', // 好友消息撤回
	Nudge = 'NudgeEvent', // 戳一戳事件
	GroupNameChange = 'GroupNameChangeEvent', // 某个群名改变
	GroupEntranceAnnouncementChange = 'GroupEntranceAnnouncementChangeEvent', // 某群入群公告改变
	GroupMuteAll = 'GroupMuteAllEvent', // 全员禁言
	GroupAllowAnonymousChat = 'GroupAllowAnonymousChatEvent', // 匿名聊天
	GroupAllowConfessTalk = 'GroupAllowConfessTalkEvent', // 坦白说
	GroupAllowMemberInvite = 'GroupAllowMemberInviteEvent', // 允许群员邀请好友加群
	MemberJoin = 'MemberJoinEvent', // 新人入群的事件
	MemberLeaveKick = 'MemberLeaveEventKick', // 成员被踢出群
	MemberLeaveQuit = 'MemberLeaveEventQuit', // 成员主动离群
	MemberCardChange = 'MemberCardChangeEvent', // 群名片改动
	MemberSpecialTitleChange = 'MemberSpecialTitleChangeEvent', // 群头衔改动
	MemberPermissionChange = 'MemberPermissionChangeEvent', // 成员权限改变的事件（该成员不是Bot）
	MemberMute = 'MemberMuteEvent', // 群成员被禁言事件（该成员不是Bot）
	MemberUnmute = 'MemberUnmuteEvent', // 群成员被取消禁言事件（该成员不是Bot）
	MemberHonorChange = 'MemberHonorChangeEvent', // 群员称号改变
	NewFriendRequest = 'NewFriendRequestEvent', // 添加好友申请
	MemberJoinRequest = 'MemberJoinRequestEvent', // 用户入群申请（Bot需要有管理员权限）
	BotInvitedJoinGroupRequest = 'BotInvitedJoinGroupRequestEvent', // Bot被邀请入群申请
	CommandExecuted = 'CommandExecutedEvent', // 命令被执行

	FriendMessage = 'FriendMessage', // 好友消息
	GroupMessage = 'GroupMessage', // 群消息
	TempMessage = 'TempMessage', // 群临时消息
	StrangerMessage = 'StrangerMessage', // 陌生人消息
	OtherClientMessage = 'OtherClientMessage', // 其他客户端消息
}

export enum QQApiCode {
	// https://github.com/project-mirai/mirai-api-http/blob/master/docs/api/API.md#%E7%8A%B6%E6%80%81%E7%A0%81
	OK = 0, //	正常
	VERIFY_KEY = 1, //	错误的verify key
	NOT_FOUND_BOT = 2, //	指定的Bot不存在
	SESSION_INVALID = 3, //	Session失效或不存在
	SESSION_NOT_ACTIVE = 4, //	Session未认证(未激活)
	NOT_FOUNT_TARGET = 5, //	发送消息目标不存在(指定对象不存在)
	NOT_FOUND_FILE = 6, //	指定文件不存在，出现于发送本地图片
	NO_PERMISSION = 10, //	无操作权限，指Bot没有对应操作的限权
	BOT_MUTED = 20, //	Bot被禁言，指Bot当前无法向指定群发送消息
	MESSAGE_TOO_LARGE = 30, //	消息过长
	BAD_ARGUMENT = 400, //	错误的访问，如参数错误等
}
