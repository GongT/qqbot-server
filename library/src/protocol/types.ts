// @ts-ignore
export type TODO = unknown;

export const enum GroupPermission {
	Owner = 'OWNER',
	Member = 'MEMBER',
	Admin = 'ADMINISTRATOR',
}

export type MessageChain = MessageType[];
export interface QQGroupMessage {
	sender: QQGroupMessageSender;
	messageChain: MessageChain;
}
export interface QQGroupMessageSender {
	id: number;
	memberName: string;
	specialTitle: string;
	permission: GroupPermission;
	joinTimestamp: number;
	lastSpeakTimestamp: number;
	muteTimeRemaining: number;
	group: {
		id: number;
		name: string;
		permission: GroupPermission;
	};
}
export interface QQFriendMessage {
	sender: QQFriendMessageSender;
	messageChain: MessageChain;
}
export interface QQFriendMessageSender {
	id: number;
	nickname: string;
	remark: string;
}
export interface QQSyncMessage {
	sender: QQSyncMessageSender;
	messageChain: MessageChain;
}
export interface QQSyncMessageSender {
	id: number;
	platform: string;
}
export namespace MessageType {
	export interface Source {
		type: 'Source';
		id: number; // 消息的识别号，用于引用回复（Source类型永远为chain的第一个元素）
		time: number; // 时间戳
	}
	export interface Quote {
		type: 'Quote';
		id: number; // 被引用回复的原消息的messageId
		groupId: number; // 被引用回复的原消息所接收的群号，当为好友消息时为0
		senderId: number; // 被引用回复的原消息的发送者的QQ号
		targetId: number; // 被引用回复的原消息的接收者者的QQ号（或群号）
		origin: MessageChain; // 被引用回复的原消息的消息链对象
	}
	export interface At {
		type: 'At';
		target: number; // 群员QQ号
		dispaly: string; // At时显示的文字，发送消息时无效，自动使用群名片
	}
	export interface AtAll {
		type: 'AtAll';
		target: number; // 群员QQ号
		dispaly: string; // At时显示的文字，发送消息时无效，自动使用群名片
	}
	export interface Face {
		type: 'Face';
		faceId: number; // QQ表情编号，可选，优先高于name
		name: string; // QQ表情拼音，可选
	}
	export interface Plain {
		type: 'Plain';
		text: string; // 文字消息
	}
	export interface Image {
		// 三个参数任选其一，出现多个参数时，按照imageId > url > path > base64的优先级
		type: 'Image';
		imageId: string; // 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
		url: string; // 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
		path: string; // 图片的路径，发送本地图片，路径相对于 JVM 工作路径（默认是当前路径，可通过 -Duser.dir=...指定），也可传入绝对路径。
		base64: string; // 图片的 Base64 编码
	}
	export interface FlashImage extends Omit<Image, 'type'> {
		type: 'FlashImage';
	}
	export interface Voice {
		type: 'Voice';
		voiceId: string; // 语音的voiceId，不为空时将忽略url属性
		url: string; // 语音的URL，发送时可作网络语音的链接；接收时为腾讯语音服务器的链接，可用于语音下载
		path: string; // 语音的路径，发送本地语音，路径相对于 JVM 工作路径（默认是当前路径，可通过 -Duser.dir=...指定），也可传入绝对路径。
		base64: string; // 语音的 Base64 编码
	}
	export interface Xml {
		type: 'Xml';
		xml: string; // XML文本
	}
	export interface Json {
		type: 'Json';
		xml: string; // Json文本
	}
	export interface App {
		type: 'App';
		content: string; // 内容
	}
	export interface Poke {
		type: 'Poke';
		name: string; //  戳一戳的类型
		/*
		 * Poke: 戳一戳
		 * ShowLove: 比心
		 * Like: 点赞
		 * Heartbroken: 心碎
		 * SixSixSix: 666
		 * FangDaZhao: 放大招
		 * */
	}
	export interface Dice {
		type: 'Dice';
		value: number; // 点数
	}
	export interface MusicShare {
		type: 'MusicShare';

		kind: string; // 类型
		title: string; // 标题
		summary: string; // 概括
		jumpUrl: string; // 跳转路径
		pictureUrl: string; // 封面路径
		musicUrl: string; // 音源路径
		brief: string; // 简介
	}
	export interface ForwardMessage {
		type: 'Forward';
		nodeList: {
			senderId: number; // 发送人QQ号
			time: number; // 发送时间
			senderName: string; // 显示名称
			messageChain: MessageChain; // 消息数组
			messageId: number; // 可以只使用消息messageId，从缓存中读取一条消息作为节点
		}[];
	}
	export interface File {
		type: 'File';
		id: string; // 文件识别id
		name: string; // 文件名
		size: number; // 文件大小
	}
	export interface MiraiCode {
		type: 'MiraiCode';
		code: string; // MiraiCode
	}
}

export type MessageType =
	| MessageType.Face
	| MessageType.Source
	| MessageType.Quote
	| MessageType.At
	| MessageType.AtAll
	| MessageType.Plain
	| MessageType.Image
	| MessageType.FlashImage
	| MessageType.Voice
	| MessageType.Xml
	| MessageType.Json
	| MessageType.App
	| MessageType.Poke
	| MessageType.Dice
	| MessageType.MusicShare
	| MessageType.ForwardMessage
	| MessageType.File
	| MessageType.MiraiCode;
