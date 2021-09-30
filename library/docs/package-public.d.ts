/// <reference types="node" />

import { ChildProcess } from 'child_process';
import { EventRegister } from '@idlebox/common';

export declare class ApiError extends Error {
    readonly code: QQApiCode;
    constructor(code: QQApiCode, message?: string);
}

export declare enum ColorKind {
    DISABLE = 0,
    TERMINAL = 1,
    WEB = 2,
    DETECT = 3
}

export declare interface CommandRegistry extends _CommandRegistry {
    about: (input: TODO) => Promise<TODO>;
    messageFromId: (input: TODO) => Promise<TODO>;
    friendList: (input: TODO) => Promise<TODO>;
    groupList: (input: TODO) => Promise<TODO>;
    memberList: (input: TODO) => Promise<TODO>;
    botProfile: (input: TODO) => Promise<TODO>;
    friendProfile: (input: TODO) => Promise<TODO>;
    memberProfile: (input: TODO) => Promise<TODO>;
    sendFriendMessage: (input: TODO) => Promise<TODO>;
    sendGroupMessage: (input: TODO) => Promise<TODO>;
    sendTempMessage: (input: TODO) => Promise<TODO>;
    sendNudge: (input: TODO) => Promise<TODO>;
    recall: (input: TODO) => Promise<TODO>;
    fileList: (input: TODO) => Promise<TODO>;
    fileInfo: (input: TODO) => Promise<TODO>;
    fileMkdir: (input: TODO) => Promise<TODO>;
    fileDelete: (input: TODO) => Promise<TODO>;
    fileMove: (input: TODO) => Promise<TODO>;
    fileRename: (input: TODO) => Promise<TODO>;
    deleteFriend: (input: TODO) => Promise<TODO>;
    mute: (input: TODO) => Promise<TODO>;
    unmute: (input: TODO) => Promise<TODO>;
    kick: (input: TODO) => Promise<TODO>;
    quit: (input: TODO) => Promise<TODO>;
    muteAll: (input: TODO) => Promise<TODO>;
    unmuteAll: (input: TODO) => Promise<TODO>;
    setEssence: (input: TODO) => Promise<TODO>;
    getGroupConfig: (input: TODO) => Promise<TODO>;
    updateGroupConfig: (input: TODO) => Promise<TODO>;
    getMemberInfo: (input: TODO) => Promise<TODO>;
    updateMemberInfo: (input: TODO) => Promise<TODO>;
    respNewFriendRequestEvent: (input: TODO) => Promise<TODO>;
    respMemberJoinRequestEvent: (input: TODO) => Promise<TODO>;
    respBotInvitedJoinGroupRequestEvent: (input: TODO) => Promise<TODO>;
}

declare type _CommandRegistry = {
    [Property in keyof typeof QQCommand as Uncapitalize<Property>]: ICommandCallback<unknown, unknown>;
};

export declare interface EventRegistry extends _EventRegistry {
    readonly onBotOnline: EventRegister<TODO>;
    readonly onBotOfflineActive: EventRegister<TODO>;
    readonly onBotOfflineForce: EventRegister<TODO>;
    readonly onBotOfflineDropped: EventRegister<TODO>;
    readonly onBotRelogin: EventRegister<TODO>;
    readonly onFriendInputStatusChanged: EventRegister<TODO>;
    readonly onFriendNickChanged: EventRegister<TODO>;
    readonly onBotGroupPermissionChange: EventRegister<TODO>;
    readonly onBotMute: EventRegister<TODO>;
    readonly onBotUnmute: EventRegister<TODO>;
    readonly onBotJoinGroup: EventRegister<TODO>;
    readonly onBotLeaveActive: EventRegister<TODO>;
    readonly onBotLeaveKick: EventRegister<TODO>;
    readonly onGroupRecall: EventRegister<TODO>;
    readonly onFriendRecall: EventRegister<TODO>;
    readonly onNudge: EventRegister<TODO>;
    readonly onGroupNameChange: EventRegister<TODO>;
    readonly onGroupEntranceAnnouncementChange: EventRegister<TODO>;
    readonly onGroupMuteAll: EventRegister<TODO>;
    readonly onGroupAllowAnonymousChat: EventRegister<TODO>;
    readonly onGroupAllowConfessTalk: EventRegister<TODO>;
    readonly onGroupAllowMemberInvite: EventRegister<TODO>;
    readonly onMemberJoin: EventRegister<TODO>;
    readonly onMemberLeaveKick: EventRegister<TODO>;
    readonly onMemberLeaveQuit: EventRegister<TODO>;
    readonly onMemberCardChange: EventRegister<TODO>;
    readonly onMemberSpecialTitleChange: EventRegister<TODO>;
    readonly onMemberPermissionChange: EventRegister<TODO>;
    readonly onMemberMute: EventRegister<TODO>;
    readonly onMemberUnmute: EventRegister<TODO>;
    readonly onMemberHonorChange: EventRegister<TODO>;
    readonly onNewFriendRequest: EventRegister<TODO>;
    readonly onMemberJoinRequest: EventRegister<TODO>;
    readonly onBotInvitedJoinGroupRequest: EventRegister<TODO>;
    readonly onCommandExecuted: EventRegister<TODO>;
    readonly onFriendMessage: EventRegister<QQFriendMessage>;
    readonly onGroupMessage: EventRegister<QQGroupMessage>;
    readonly onTempMessage: EventRegister<QQGroupMessage>;
    readonly onStrangerMessage: EventRegister<QQFriendMessage>;
    readonly onOtherClientMessage: EventRegister<QQSyncMessage>;
}

declare type _EventRegistry = {
    [Property in keyof typeof QQEvent as `on${Capitalize<Property>}`]: EventRegister<any>;
};

export declare const enum GroupPermission {
    Owner = "OWNER",
    Member = "MEMBER",
    Admin = "ADMINISTRATOR"
}

declare interface ICommandCallback<IT, OT> {
    (data: IT): Promise<OT>;
}

export declare const ipcChannel: EventRegistry & CommandRegistry;

export declare class IpcChannelServer {
    protected readonly process: ChildProcess;
    constructor(process: ChildProcess);
    triggerEvent(): void;
    onHandle(): void;
}

export declare type IPCClientMessage = IPCMessageWithId & (IPCMessageCommand | IPCMessageEventControl);

export declare namespace IPCMessage {
    export function isEventControl(t: IPCClientMessage): t is IPCMessageEventControl & IPCMessageWithId;
    export function isEvent(t: IPCServerMessage): t is IPCMessageEvent;
    export function isCommand(t: IPCClientMessage): t is IPCMessageCommand & IPCMessageWithId;
    export function isLifecycle(t: IPCServerMessage): t is IPCMessageLifecycle;
    export function isAck(t: IPCServerMessage): t is IPCMessageAck;
}

export declare interface IPCMessageAck {
    kind: 'ack';
}

export declare interface IPCMessageCommand {
    kind: 'command';
    event: QQCommand;
    payload: any;
}

export declare interface IPCMessageEvent {
    kind: 'event';
    event: QQEvent;
    payload: any;
}

export declare interface IPCMessageEventControl {
    kind: 'event-manage';
    action: IPCMessageEventControlAction;
    event: QQEvent;
}

export declare enum IPCMessageEventControlAction {
    EnableListen = 0,
    DisableListen = 1
}

export declare interface IPCMessageLifecycle {
    kind: 'lifecycle';
    action: IPCMessageLifecycleAction;
}

export declare enum IPCMessageLifecycleAction {
    Start = 0,
    Stop = 1
}

declare interface IPCMessageWithId {
    __id: string;
}

export declare type IPCServerMessage = IPCMessageAck | IPCMessageEvent | IPCMessageLifecycle;

export declare type MessageChain = MessageType[];

export declare namespace MessageType {
    export interface Source {
        type: 'Source';
        id: number;
        time: number;
    }
    export interface Quote {
        type: 'Quote';
        id: number;
        groupId: number;
        senderId: number;
        targetId: number;
        origin: MessageChain;
    }
    export interface At {
        type: 'At';
        target: number;
        dispaly: string;
    }
    export interface AtAll {
        type: 'AtAll';
        target: number;
        dispaly: string;
    }
    export interface Face {
        type: 'Face';
        faceId: number;
        name: string;
    }
    export interface Plain {
        type: 'Plain';
        text: string;
    }
    export interface Image {
        type: 'Image';
        imageId: string;
        url: string;
        path: string;
        base64: string;
    }
    export interface FlashImage extends Omit<Image, 'type'> {
        type: 'FlashImage';
    }
    export interface Voice {
        type: 'Voice';
        voiceId: string;
        url: string;
        path: string;
        base64: string;
    }
    export interface Xml {
        type: 'Xml';
        xml: string;
    }
    export interface Json {
        type: 'Json';
        xml: string;
    }
    export interface App {
        type: 'App';
        content: string;
    }
    export interface Poke {
        type: 'Poke';
        name: string;
    }
    export interface Dice {
        type: 'Dice';
        value: number;
    }
    export interface MusicShare {
        type: 'MusicShare';
        kind: string;
        title: string;
        summary: string;
        jumpUrl: string;
        pictureUrl: string;
        musicUrl: string;
        brief: string;
    }
    export interface ForwardMessage {
        type: 'Forward';
        nodeList: {
            senderId: number;
            time: number;
            senderName: string;
            messageChain: MessageChain;
            messageId: number;
        }[];
    }
    export interface File {
        type: 'File';
        id: string;
        name: string;
        size: number;
    }
    export interface MiraiCode {
        type: 'MiraiCode';
        code: string;
    }
}

export declare type MessageType = MessageType.Face | MessageType.Source | MessageType.Quote | MessageType.At | MessageType.AtAll | MessageType.Plain | MessageType.Image | MessageType.FlashImage | MessageType.Voice | MessageType.Xml | MessageType.Json | MessageType.App | MessageType.Poke | MessageType.Dice | MessageType.MusicShare | MessageType.ForwardMessage | MessageType.File | MessageType.MiraiCode;

export declare class NetworkError extends Error {
}

export declare enum QQApiCode {
    OK = 0,
    VERIFY_KEY = 1,
    NOT_FOUND_BOT = 2,
    SESSION_INVALID = 3,
    SESSION_NOT_ACTIVE = 4,
    NOT_FOUNT_TARGET = 5,
    NOT_FOUND_FILE = 6,
    NO_PERMISSION = 10,
    BOT_MUTED = 20,
    MESSAGE_TOO_LARGE = 30,
    BAD_ARGUMENT = 400
}

export declare enum QQCommand {
    About = "about",
    MessageFromId = "messageFromId",
    FriendList = "friendList",
    GroupList = "groupList",
    MemberList = "memberList",
    BotProfile = "botProfile",
    FriendProfile = "friendProfile",
    MemberProfile = "memberProfile",
    SendFriendMessage = "sendFriendMessage",
    SendGroupMessage = "sendGroupMessage",
    SendTempMessage = "sendTempMessage",
    SendNudge = "sendNudge",
    Recall = "recall",
    FileList = "file_list",
    FileInfo = "file_info",
    FileMkdir = "file_mkdir",
    FileDelete = "file_delete",
    FileMove = "file_move",
    FileRename = "file_rename",
    DeleteFriend = "deleteFriend",
    Mute = "mute",
    Unmute = "unmute",
    Kick = "kick",
    Quit = "quit",
    MuteAll = "muteAll",
    UnmuteAll = "unmuteAll",
    SetEssence = "setEssence",
    GetGroupConfig = "groupConfig+get",
    UpdateGroupConfig = "groupConfig+update",
    GetMemberInfo = "memberInfo+get",
    UpdateMemberInfo = "memberInfo+update",
    RespNewFriendRequestEvent = "resp_newFriendRequestEvent",
    RespMemberJoinRequestEvent = "resp_memberJoinRequestEvent",
    RespBotInvitedJoinGroupRequestEvent = "resp_botInvitedJoinGroupRequestEvent"
}

export declare enum QQEvent {
    BotOnline = "BotOnlineEvent",
    BotOfflineActive = "BotOfflineEventActive",
    BotOfflineForce = "BotOfflineEventForce",
    BotOfflineDropped = "BotOfflineEventDropped",
    BotRelogin = "BotReloginEvent",
    FriendInputStatusChanged = "FriendInputStatusChangedEvent",
    FriendNickChanged = "FriendNickChangedEvent",
    BotGroupPermissionChange = "BotGroupPermissionChangeEvent",
    BotMute = "BotMuteEvent",
    BotUnmute = "BotUnmuteEvent",
    BotJoinGroup = "BotJoinGroupEvent",
    BotLeaveActive = "BotLeaveEventActive",
    BotLeaveKick = "BotLeaveEventKick",
    GroupRecall = "GroupRecallEvent",
    FriendRecall = "FriendRecallEvent",
    Nudge = "NudgeEvent",
    GroupNameChange = "GroupNameChangeEvent",
    GroupEntranceAnnouncementChange = "GroupEntranceAnnouncementChangeEvent",
    GroupMuteAll = "GroupMuteAllEvent",
    GroupAllowAnonymousChat = "GroupAllowAnonymousChatEvent",
    GroupAllowConfessTalk = "GroupAllowConfessTalkEvent",
    GroupAllowMemberInvite = "GroupAllowMemberInviteEvent",
    MemberJoin = "MemberJoinEvent",
    MemberLeaveKick = "MemberLeaveEventKick",
    MemberLeaveQuit = "MemberLeaveEventQuit",
    MemberCardChange = "MemberCardChangeEvent",
    MemberSpecialTitleChange = "MemberSpecialTitleChangeEvent",
    MemberPermissionChange = "MemberPermissionChangeEvent",
    MemberMute = "MemberMuteEvent",
    MemberUnmute = "MemberUnmuteEvent",
    MemberHonorChange = "MemberHonorChangeEvent",
    NewFriendRequest = "NewFriendRequestEvent",
    MemberJoinRequest = "MemberJoinRequestEvent",
    BotInvitedJoinGroupRequest = "BotInvitedJoinGroupRequestEvent",
    CommandExecuted = "CommandExecutedEvent",
    FriendMessage = "FriendMessage",
    GroupMessage = "GroupMessage",
    TempMessage = "TempMessage",
    StrangerMessage = "StrangerMessage",
    OtherClientMessage = "OtherClientMessage"
}

export declare interface QQFriendMessage {
    sender: QQFriendMessageSender;
    messageChain: MessageChain;
}

export declare interface QQFriendMessageSender {
    id: number;
    nickname: string;
    remark: string;
}

export declare interface QQGroupMessage {
    sender: QQGroupMessageSender;
    messageChain: MessageChain;
}

export declare interface QQGroupMessageSender {
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

export declare enum QQMessageType {
}

export declare interface QQSyncMessage {
    sender: QQSyncMessageSender;
    messageChain: MessageChain;
}

export declare interface QQSyncMessageSender {
    id: number;
    platform: string;
}

declare interface TerminalConsoleOptions {
    color?: boolean;
}

export declare type TODO = unknown;

declare interface WebConsoleOptions {
    color?: boolean;
}

export declare class WebTerminalConsole extends WrappedConsole {
    private readonly colors;
    constructor(title: string, { color, ...opt }?: WrappedConsoleOptions & WebConsoleOptions);
    protected processColorLabel(msg: any[], pos: number, level: string, prefix: string): void;
}

export declare abstract class WrappedConsole {
    info: Console['info'];
    log: Console['log'];
    success: Console['log'];
    debug: Console['debug'];
    error: Console['error'];
    trace: Console['trace'];
    warn: Console['warn'];
    assert: Console['assert'];
    time: Console['time'];
    timeEnd: Console['timeEnd'];
    timeLog: Console['timeLog'];
    count: Console['count'];
    countReset: Console['countReset'];
    group: Console['group'];
    groupCollapsed: Console['groupCollapsed'];
    groupEnd: Console['groupEnd'];
    table: Console['table'];
    dir: Console['dir'];
    clear: Console['clear'];
    protected readonly title: string;
    protected readonly parent: Console;
    protected readonly bind: boolean;
    constructor(title: string, { parent, bind }?: WrappedConsoleOptions);
    protected wrap<T extends keyof Omit<Console & {
        Console: any;
    }, 'Console'>>(original: T): Function;
    private wrapSimple;
    private wrapExtra;
    protected createPrefix(message: string): string;
    private wrapMessageAt;
    private convertObjectArg;
    protected abstract processColorLabel(normalizedArguments: any[], messageLoc: number, level: string, prefix: string): void;
    protected uncolor(args: any[], pos: number, prefix: string, postfix: string): void;
}

export declare interface WrappedConsoleOptions {
    parent?: Console;
    bind?: boolean;
}

export declare class WrappedTerminalConsole extends WrappedConsole {
    private readonly colors;
    constructor(title: string, { color, ...opt }?: WrappedConsoleOptions & TerminalConsoleOptions);
    protected processColorLabel(msg: any[], pos: number, level: string, prefix: string): void;
}

export { }
