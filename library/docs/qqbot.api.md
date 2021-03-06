## API Report File for "@gongt/qqbot"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="node" />

import { ChildProcess } from 'child_process';
import { EventRegister } from '@idlebox/common';

// Warning: (ae-missing-release-tag) "ApiError" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class ApiError extends Error {
    constructor(code: QQApiCode, message?: string);
    // (undocumented)
    readonly code: QQApiCode;
}

// Warning: (ae-missing-release-tag) "ColorKind" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export enum ColorKind {
    // (undocumented)
    DETECT = 3,
    // (undocumented)
    DISABLE = 0,
    // (undocumented)
    TERMINAL = 1,
    // (undocumented)
    WEB = 2
}

// Warning: (ae-forgotten-export) The symbol "_CommandRegistry" needs to be exported by the entry point _export_all_in_one_index.d.ts
// Warning: (ae-missing-release-tag) "CommandRegistry" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface CommandRegistry extends _CommandRegistry {
    // (undocumented)
    about: (input: TODO) => Promise<TODO>;
    // (undocumented)
    botProfile: (input: TODO) => Promise<TODO>;
    // (undocumented)
    deleteFriend: (input: TODO) => Promise<TODO>;
    // (undocumented)
    fileDelete: (input: TODO) => Promise<TODO>;
    // (undocumented)
    fileInfo: (input: TODO) => Promise<TODO>;
    // (undocumented)
    fileList: (input: TODO) => Promise<TODO>;
    // (undocumented)
    fileMkdir: (input: TODO) => Promise<TODO>;
    // (undocumented)
    fileMove: (input: TODO) => Promise<TODO>;
    // (undocumented)
    fileRename: (input: TODO) => Promise<TODO>;
    // (undocumented)
    friendList: (input: TODO) => Promise<TODO>;
    // (undocumented)
    friendProfile: (input: TODO) => Promise<TODO>;
    // (undocumented)
    getGroupConfig: (input: TODO) => Promise<TODO>;
    // (undocumented)
    getMemberInfo: (input: TODO) => Promise<TODO>;
    // (undocumented)
    groupList: (input: TODO) => Promise<TODO>;
    // (undocumented)
    kick: (input: TODO) => Promise<TODO>;
    // (undocumented)
    memberList: (input: TODO) => Promise<TODO>;
    // (undocumented)
    memberProfile: (input: TODO) => Promise<TODO>;
    // (undocumented)
    messageFromId: (input: TODO) => Promise<TODO>;
    // (undocumented)
    mute: (input: TODO) => Promise<TODO>;
    // (undocumented)
    muteAll: (input: TODO) => Promise<TODO>;
    // (undocumented)
    quit: (input: TODO) => Promise<TODO>;
    // (undocumented)
    recall: (input: TODO) => Promise<TODO>;
    // (undocumented)
    respBotInvitedJoinGroupRequestEvent: (input: TODO) => Promise<TODO>;
    // (undocumented)
    respMemberJoinRequestEvent: (input: TODO) => Promise<TODO>;
    // (undocumented)
    respNewFriendRequestEvent: (input: TODO) => Promise<TODO>;
    // (undocumented)
    sendFriendMessage: (input: TODO) => Promise<TODO>;
    // (undocumented)
    sendGroupMessage: (input: TODO) => Promise<TODO>;
    // (undocumented)
    sendNudge: (input: TODO) => Promise<TODO>;
    // (undocumented)
    sendTempMessage: (input: TODO) => Promise<TODO>;
    // (undocumented)
    setEssence: (input: TODO) => Promise<TODO>;
    // (undocumented)
    unmute: (input: TODO) => Promise<TODO>;
    // (undocumented)
    unmuteAll: (input: TODO) => Promise<TODO>;
    // (undocumented)
    updateGroupConfig: (input: TODO) => Promise<TODO>;
    // (undocumented)
    updateMemberInfo: (input: TODO) => Promise<TODO>;
}

// Warning: (ae-forgotten-export) The symbol "_EventRegistry" needs to be exported by the entry point _export_all_in_one_index.d.ts
// Warning: (ae-missing-release-tag) "EventRegistry" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface EventRegistry extends _EventRegistry {
    // (undocumented)
    readonly onBotGroupPermissionChange: EventRegister<TODO>;
    // (undocumented)
    readonly onBotInvitedJoinGroupRequest: EventRegister<TODO>;
    // (undocumented)
    readonly onBotJoinGroup: EventRegister<TODO>;
    // (undocumented)
    readonly onBotLeaveActive: EventRegister<TODO>;
    // (undocumented)
    readonly onBotLeaveKick: EventRegister<TODO>;
    // (undocumented)
    readonly onBotMute: EventRegister<TODO>;
    // (undocumented)
    readonly onBotOfflineActive: EventRegister<TODO>;
    // (undocumented)
    readonly onBotOfflineDropped: EventRegister<TODO>;
    // (undocumented)
    readonly onBotOfflineForce: EventRegister<TODO>;
    // (undocumented)
    readonly onBotOnline: EventRegister<TODO>;
    // (undocumented)
    readonly onBotRelogin: EventRegister<TODO>;
    // (undocumented)
    readonly onBotUnmute: EventRegister<TODO>;
    // (undocumented)
    readonly onCommandExecuted: EventRegister<TODO>;
    // (undocumented)
    readonly onFriendInputStatusChanged: EventRegister<TODO>;
    // (undocumented)
    readonly onFriendMessage: EventRegister<QQFriendMessage>;
    // (undocumented)
    readonly onFriendNickChanged: EventRegister<TODO>;
    // (undocumented)
    readonly onFriendRecall: EventRegister<TODO>;
    // (undocumented)
    readonly onGroupAllowAnonymousChat: EventRegister<TODO>;
    // (undocumented)
    readonly onGroupAllowConfessTalk: EventRegister<TODO>;
    // (undocumented)
    readonly onGroupAllowMemberInvite: EventRegister<TODO>;
    // (undocumented)
    readonly onGroupEntranceAnnouncementChange: EventRegister<TODO>;
    // (undocumented)
    readonly onGroupMessage: EventRegister<QQGroupMessage>;
    // (undocumented)
    readonly onGroupMuteAll: EventRegister<TODO>;
    // (undocumented)
    readonly onGroupNameChange: EventRegister<TODO>;
    // (undocumented)
    readonly onGroupRecall: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberCardChange: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberHonorChange: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberJoin: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberJoinRequest: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberLeaveKick: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberLeaveQuit: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberMute: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberPermissionChange: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberSpecialTitleChange: EventRegister<TODO>;
    // (undocumented)
    readonly onMemberUnmute: EventRegister<TODO>;
    // (undocumented)
    readonly onNewFriendRequest: EventRegister<TODO>;
    // (undocumented)
    readonly onNudge: EventRegister<TODO>;
    // (undocumented)
    readonly onOtherClientMessage: EventRegister<QQSyncMessage>;
    // (undocumented)
    readonly onStrangerMessage: EventRegister<QQFriendMessage>;
    // (undocumented)
    readonly onTempMessage: EventRegister<QQGroupMessage>;
}

// Warning: (ae-missing-release-tag) "GroupPermission" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const enum GroupPermission {
    // (undocumented)
    Admin = "ADMINISTRATOR",
    // (undocumented)
    Member = "MEMBER",
    // (undocumented)
    Owner = "OWNER"
}

// Warning: (ae-missing-release-tag) "ipcChannel" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const ipcChannel: EventRegistry & CommandRegistry;

// Warning: (ae-missing-release-tag) "IpcChannelServer" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class IpcChannelServer {
    constructor(process: ChildProcess);
    // (undocumented)
    onHandle(): void;
    // (undocumented)
    protected readonly process: ChildProcess;
    // (undocumented)
    triggerEvent(): void;
}

// Warning: (ae-forgotten-export) The symbol "IPCMessageWithId" needs to be exported by the entry point _export_all_in_one_index.d.ts
// Warning: (ae-missing-release-tag) "IPCClientMessage" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type IPCClientMessage = IPCMessageWithId & (IPCMessageCommand | IPCMessageEventControl);

// Warning: (ae-missing-release-tag) "IPCMessage" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export namespace IPCMessage {
    // (undocumented)
    export function isAck(t: IPCServerMessage): t is IPCMessageAck;
    // (undocumented)
    export function isCommand(t: IPCClientMessage): t is IPCMessageCommand & IPCMessageWithId;
    // (undocumented)
    export function isEvent(t: IPCServerMessage): t is IPCMessageEvent;
    // (undocumented)
    export function isEventControl(t: IPCClientMessage): t is IPCMessageEventControl & IPCMessageWithId;
    // (undocumented)
    export function isLifecycle(t: IPCServerMessage): t is IPCMessageLifecycle;
}

// Warning: (ae-missing-release-tag) "IPCMessageAck" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface IPCMessageAck {
    // (undocumented)
    kind: 'ack';
}

// Warning: (ae-missing-release-tag) "IPCMessageCommand" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface IPCMessageCommand {
    // (undocumented)
    event: QQCommand;
    // (undocumented)
    kind: 'command';
    // (undocumented)
    payload: any;
}

// Warning: (ae-missing-release-tag) "IPCMessageEvent" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface IPCMessageEvent {
    // (undocumented)
    event: QQEvent;
    // (undocumented)
    kind: 'event';
    // (undocumented)
    payload: any;
}

// Warning: (ae-missing-release-tag) "IPCMessageEventControl" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface IPCMessageEventControl {
    // (undocumented)
    action: IPCMessageEventControlAction;
    // (undocumented)
    event: QQEvent;
    // (undocumented)
    kind: 'event-manage';
}

// Warning: (ae-missing-release-tag) "IPCMessageEventControlAction" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export enum IPCMessageEventControlAction {
    // (undocumented)
    DisableListen = 1,
    // (undocumented)
    EnableListen = 0
}

// Warning: (ae-missing-release-tag) "IPCMessageLifecycle" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface IPCMessageLifecycle {
    // (undocumented)
    action: IPCMessageLifecycleAction;
    // (undocumented)
    kind: 'lifecycle';
}

// Warning: (ae-missing-release-tag) "IPCMessageLifecycleAction" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export enum IPCMessageLifecycleAction {
    // (undocumented)
    Start = 0,
    // (undocumented)
    Stop = 1
}

// Warning: (ae-missing-release-tag) "IPCServerMessage" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type IPCServerMessage = IPCMessageAck | IPCMessageEvent | IPCMessageLifecycle;

// Warning: (ae-missing-release-tag) "MessageChain" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type MessageChain = MessageType[];

// Warning: (ae-missing-release-tag) "MessageType" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
// Warning: (ae-missing-release-tag) "MessageType" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export namespace MessageType {
    // (undocumented)
    export interface App {
        // (undocumented)
        content: string;
        // (undocumented)
        type: 'App';
    }
    // (undocumented)
    export interface At {
        // (undocumented)
        dispaly: string;
        // (undocumented)
        target: number;
        // (undocumented)
        type: 'At';
    }
    // (undocumented)
    export interface AtAll {
        // (undocumented)
        dispaly: string;
        // (undocumented)
        target: number;
        // (undocumented)
        type: 'AtAll';
    }
    // (undocumented)
    export interface Dice {
        // (undocumented)
        type: 'Dice';
        // (undocumented)
        value: number;
    }
    // (undocumented)
    export interface Face {
        // (undocumented)
        faceId: number;
        // (undocumented)
        name: string;
        // (undocumented)
        type: 'Face';
    }
    // (undocumented)
    export interface File {
        // (undocumented)
        id: string;
        // (undocumented)
        name: string;
        // (undocumented)
        size: number;
        // (undocumented)
        type: 'File';
    }
    // (undocumented)
    export interface FlashImage extends Omit<Image, 'type'> {
        // (undocumented)
        type: 'FlashImage';
    }
    // (undocumented)
    export interface ForwardMessage {
        // (undocumented)
        nodeList: {
            senderId: number;
            time: number;
            senderName: string;
            messageChain: MessageChain;
            messageId: number;
        }[];
        // (undocumented)
        type: 'Forward';
    }
    // (undocumented)
    export interface Image {
        // (undocumented)
        base64: string;
        // (undocumented)
        imageId: string;
        // (undocumented)
        path: string;
        // (undocumented)
        type: 'Image';
        // (undocumented)
        url: string;
    }
    // (undocumented)
    export interface Json {
        // (undocumented)
        type: 'Json';
        // (undocumented)
        xml: string;
    }
    // (undocumented)
    export interface MiraiCode {
        // (undocumented)
        code: string;
        // (undocumented)
        type: 'MiraiCode';
    }
    // (undocumented)
    export interface MusicShare {
        // (undocumented)
        brief: string;
        // (undocumented)
        jumpUrl: string;
        // (undocumented)
        kind: string;
        // (undocumented)
        musicUrl: string;
        // (undocumented)
        pictureUrl: string;
        // (undocumented)
        summary: string;
        // (undocumented)
        title: string;
        // (undocumented)
        type: 'MusicShare';
    }
    // (undocumented)
    export interface Plain {
        // (undocumented)
        text: string;
        // (undocumented)
        type: 'Plain';
    }
    // (undocumented)
    export interface Poke {
        // (undocumented)
        name: string;
        // (undocumented)
        type: 'Poke';
    }
    // (undocumented)
    export interface Quote {
        // (undocumented)
        groupId: number;
        // (undocumented)
        id: number;
        // (undocumented)
        origin: MessageChain;
        // (undocumented)
        senderId: number;
        // (undocumented)
        targetId: number;
        // (undocumented)
        type: 'Quote';
    }
    // (undocumented)
    export interface Source {
        // (undocumented)
        id: number;
        // (undocumented)
        time: number;
        // (undocumented)
        type: 'Source';
    }
    // (undocumented)
    export interface Voice {
        // (undocumented)
        base64: string;
        // (undocumented)
        path: string;
        // (undocumented)
        type: 'Voice';
        // (undocumented)
        url: string;
        // (undocumented)
        voiceId: string;
    }
    // (undocumented)
    export interface Xml {
        // (undocumented)
        type: 'Xml';
        // (undocumented)
        xml: string;
    }
}

// @public (undocumented)
export type MessageType = MessageType.Face | MessageType.Source | MessageType.Quote | MessageType.At | MessageType.AtAll | MessageType.Plain | MessageType.Image | MessageType.FlashImage | MessageType.Voice | MessageType.Xml | MessageType.Json | MessageType.App | MessageType.Poke | MessageType.Dice | MessageType.MusicShare | MessageType.ForwardMessage | MessageType.File | MessageType.MiraiCode;

// Warning: (ae-missing-release-tag) "NetworkError" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class NetworkError extends Error {
}

// Warning: (ae-missing-release-tag) "QQApiCode" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export enum QQApiCode {
    // (undocumented)
    BAD_ARGUMENT = 400,
    // (undocumented)
    BOT_MUTED = 20,
    // (undocumented)
    MESSAGE_TOO_LARGE = 30,
    // (undocumented)
    NO_PERMISSION = 10,
    // (undocumented)
    NOT_FOUND_BOT = 2,
    // (undocumented)
    NOT_FOUND_FILE = 6,
    // (undocumented)
    NOT_FOUNT_TARGET = 5,
    // (undocumented)
    OK = 0,
    // (undocumented)
    SESSION_INVALID = 3,
    // (undocumented)
    SESSION_NOT_ACTIVE = 4,
    // (undocumented)
    VERIFY_KEY = 1
}

// Warning: (ae-missing-release-tag) "QQCommand" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export enum QQCommand {
    // (undocumented)
    About = "about",
    // (undocumented)
    BotProfile = "botProfile",
    // (undocumented)
    DeleteFriend = "deleteFriend",
    // (undocumented)
    FileDelete = "file_delete",
    // (undocumented)
    FileInfo = "file_info",
    // (undocumented)
    FileList = "file_list",
    // (undocumented)
    FileMkdir = "file_mkdir",
    // (undocumented)
    FileMove = "file_move",
    // (undocumented)
    FileRename = "file_rename",
    // (undocumented)
    FriendList = "friendList",
    // (undocumented)
    FriendProfile = "friendProfile",
    // (undocumented)
    GetGroupConfig = "groupConfig+get",
    // (undocumented)
    GetMemberInfo = "memberInfo+get",
    // (undocumented)
    GroupList = "groupList",
    // (undocumented)
    Kick = "kick",
    // (undocumented)
    MemberList = "memberList",
    // (undocumented)
    MemberProfile = "memberProfile",
    // (undocumented)
    MessageFromId = "messageFromId",
    // (undocumented)
    Mute = "mute",
    // (undocumented)
    MuteAll = "muteAll",
    // (undocumented)
    Quit = "quit",
    // (undocumented)
    Recall = "recall",
    // (undocumented)
    RespBotInvitedJoinGroupRequestEvent = "resp_botInvitedJoinGroupRequestEvent",
    // (undocumented)
    RespMemberJoinRequestEvent = "resp_memberJoinRequestEvent",
    // (undocumented)
    RespNewFriendRequestEvent = "resp_newFriendRequestEvent",
    // (undocumented)
    SendFriendMessage = "sendFriendMessage",
    // (undocumented)
    SendGroupMessage = "sendGroupMessage",
    // (undocumented)
    SendNudge = "sendNudge",
    // (undocumented)
    SendTempMessage = "sendTempMessage",
    // (undocumented)
    SetEssence = "setEssence",
    // (undocumented)
    Unmute = "unmute",
    // (undocumented)
    UnmuteAll = "unmuteAll",
    // (undocumented)
    UpdateGroupConfig = "groupConfig+update",
    // (undocumented)
    UpdateMemberInfo = "memberInfo+update"
}

// Warning: (ae-missing-release-tag) "QQEvent" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export enum QQEvent {
    // (undocumented)
    BotGroupPermissionChange = "BotGroupPermissionChangeEvent",
    // (undocumented)
    BotInvitedJoinGroupRequest = "BotInvitedJoinGroupRequestEvent",
    // (undocumented)
    BotJoinGroup = "BotJoinGroupEvent",
    // (undocumented)
    BotLeaveActive = "BotLeaveEventActive",
    // (undocumented)
    BotLeaveKick = "BotLeaveEventKick",
    // (undocumented)
    BotMute = "BotMuteEvent",
    // (undocumented)
    BotOfflineActive = "BotOfflineEventActive",
    // (undocumented)
    BotOfflineDropped = "BotOfflineEventDropped",
    // (undocumented)
    BotOfflineForce = "BotOfflineEventForce",
    // (undocumented)
    BotOnline = "BotOnlineEvent",
    // (undocumented)
    BotRelogin = "BotReloginEvent",
    // (undocumented)
    BotUnmute = "BotUnmuteEvent",
    // (undocumented)
    CommandExecuted = "CommandExecutedEvent",
    // (undocumented)
    FriendInputStatusChanged = "FriendInputStatusChangedEvent",
    // (undocumented)
    FriendMessage = "FriendMessage",
    // (undocumented)
    FriendNickChanged = "FriendNickChangedEvent",
    // (undocumented)
    FriendRecall = "FriendRecallEvent",
    // (undocumented)
    GroupAllowAnonymousChat = "GroupAllowAnonymousChatEvent",
    // (undocumented)
    GroupAllowConfessTalk = "GroupAllowConfessTalkEvent",
    // (undocumented)
    GroupAllowMemberInvite = "GroupAllowMemberInviteEvent",
    // (undocumented)
    GroupEntranceAnnouncementChange = "GroupEntranceAnnouncementChangeEvent",
    // (undocumented)
    GroupMessage = "GroupMessage",
    // (undocumented)
    GroupMuteAll = "GroupMuteAllEvent",
    // (undocumented)
    GroupNameChange = "GroupNameChangeEvent",
    // (undocumented)
    GroupRecall = "GroupRecallEvent",
    // (undocumented)
    MemberCardChange = "MemberCardChangeEvent",
    // (undocumented)
    MemberHonorChange = "MemberHonorChangeEvent",
    // (undocumented)
    MemberJoin = "MemberJoinEvent",
    // (undocumented)
    MemberJoinRequest = "MemberJoinRequestEvent",
    // (undocumented)
    MemberLeaveKick = "MemberLeaveEventKick",
    // (undocumented)
    MemberLeaveQuit = "MemberLeaveEventQuit",
    // (undocumented)
    MemberMute = "MemberMuteEvent",
    // (undocumented)
    MemberPermissionChange = "MemberPermissionChangeEvent",
    // (undocumented)
    MemberSpecialTitleChange = "MemberSpecialTitleChangeEvent",
    // (undocumented)
    MemberUnmute = "MemberUnmuteEvent",
    // (undocumented)
    NewFriendRequest = "NewFriendRequestEvent",
    // (undocumented)
    Nudge = "NudgeEvent",
    // (undocumented)
    OtherClientMessage = "OtherClientMessage",
    // (undocumented)
    StrangerMessage = "StrangerMessage",
    // (undocumented)
    TempMessage = "TempMessage"
}

// Warning: (ae-missing-release-tag) "QQFriendMessage" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface QQFriendMessage {
    // (undocumented)
    messageChain: MessageChain;
    // (undocumented)
    sender: QQFriendMessageSender;
}

// Warning: (ae-missing-release-tag) "QQFriendMessageSender" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface QQFriendMessageSender {
    // (undocumented)
    id: number;
    // (undocumented)
    nickname: string;
    // (undocumented)
    remark: string;
}

// Warning: (ae-missing-release-tag) "QQGroupMessage" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface QQGroupMessage {
    // (undocumented)
    messageChain: MessageChain;
    // (undocumented)
    sender: QQGroupMessageSender;
}

// Warning: (ae-missing-release-tag) "QQGroupMessageSender" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface QQGroupMessageSender {
    // (undocumented)
    group: {
        id: number;
        name: string;
        permission: GroupPermission;
    };
    // (undocumented)
    id: number;
    // (undocumented)
    joinTimestamp: number;
    // (undocumented)
    lastSpeakTimestamp: number;
    // (undocumented)
    memberName: string;
    // (undocumented)
    muteTimeRemaining: number;
    // (undocumented)
    permission: GroupPermission;
    // (undocumented)
    specialTitle: string;
}

// Warning: (ae-missing-release-tag) "QQMessageType" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export enum QQMessageType {
}

// Warning: (ae-missing-release-tag) "QQSyncMessage" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface QQSyncMessage {
    // (undocumented)
    messageChain: MessageChain;
    // (undocumented)
    sender: QQSyncMessageSender;
}

// Warning: (ae-missing-release-tag) "QQSyncMessageSender" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface QQSyncMessageSender {
    // (undocumented)
    id: number;
    // (undocumented)
    platform: string;
}

// Warning: (ae-missing-release-tag) "TODO" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type TODO = unknown;

// Warning: (ae-missing-release-tag) "WebTerminalConsole" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class WebTerminalConsole extends WrappedConsole {
    // Warning: (ae-forgotten-export) The symbol "WebConsoleOptions" needs to be exported by the entry point _export_all_in_one_index.d.ts
    constructor(title: string, { color, ...opt }?: WrappedConsoleOptions & WebConsoleOptions);
    // (undocumented)
    protected processColorLabel(msg: any[], pos: number, level: string, prefix: string): void;
}

// Warning: (ae-missing-release-tag) "WrappedConsole" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export abstract class WrappedConsole {
    constructor(title: string, { parent, bind }?: WrappedConsoleOptions);
    // (undocumented)
    assert: Console['assert'];
    // (undocumented)
    protected readonly bind: boolean;
    // (undocumented)
    clear: Console['clear'];
    // (undocumented)
    count: Console['count'];
    // (undocumented)
    countReset: Console['countReset'];
    // (undocumented)
    protected createPrefix(message: string): string;
    // (undocumented)
    debug: Console['debug'];
    // (undocumented)
    dir: Console['dir'];
    // (undocumented)
    error: Console['error'];
    // (undocumented)
    group: Console['group'];
    // (undocumented)
    groupCollapsed: Console['groupCollapsed'];
    // (undocumented)
    groupEnd: Console['groupEnd'];
    // (undocumented)
    info: Console['info'];
    // (undocumented)
    log: Console['log'];
    // (undocumented)
    protected readonly parent: Console;
    // (undocumented)
    protected abstract processColorLabel(normalizedArguments: any[], messageLoc: number, level: string, prefix: string): void;
    // (undocumented)
    success: Console['log'];
    // (undocumented)
    table: Console['table'];
    // (undocumented)
    time: Console['time'];
    // (undocumented)
    timeEnd: Console['timeEnd'];
    // (undocumented)
    timeLog: Console['timeLog'];
    // (undocumented)
    protected readonly title: string;
    // (undocumented)
    trace: Console['trace'];
    // (undocumented)
    protected uncolor(args: any[], pos: number, prefix: string, postfix: string): void;
    // (undocumented)
    warn: Console['warn'];
    // (undocumented)
    protected wrap<T extends keyof Omit<Console & {
        Console: any;
    }, 'Console'>>(original: T): Function;
}

// Warning: (ae-missing-release-tag) "WrappedConsoleOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface WrappedConsoleOptions {
    // (undocumented)
    bind?: boolean;
    // (undocumented)
    parent?: Console;
}

// Warning: (ae-missing-release-tag) "WrappedTerminalConsole" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class WrappedTerminalConsole extends WrappedConsole {
    // Warning: (ae-forgotten-export) The symbol "TerminalConsoleOptions" needs to be exported by the entry point _export_all_in_one_index.d.ts
    constructor(title: string, { color, ...opt }?: WrappedConsoleOptions & TerminalConsoleOptions);
    // (undocumented)
    protected processColorLabel(msg: any[], pos: number, level: string, prefix: string): void;
}

// (No @packageDocumentation comment for this package)

```
