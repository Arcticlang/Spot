"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Message_instances, _Message_props;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
const Base_1 = __importDefault(require("../Base"));
const BaseChannel_1 = __importDefault(require("../channel/BaseChannel"));
const User_1 = __importDefault(require("../user/User"));
const Role_1 = __importDefault(require("../guild/role/Role"));
const MentionHandler_1 = __importDefault(require("./MentionHandler"));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["DEFAULT"] = 0] = "DEFAULT";
    MessageType[MessageType["RECIPIENT_ADD"] = 1] = "RECIPIENT_ADD";
    MessageType[MessageType["RECIPIENT_REMOVE"] = 2] = "RECIPIENT_REMOVE";
    MessageType[MessageType["CALL"] = 3] = "CALL";
    MessageType[MessageType["CHANNEL_NAME_CHANGE"] = 4] = "CHANNEL_NAME_CHANGE";
    MessageType[MessageType["CHANNEL_ICON_CHANGE"] = 5] = "CHANNEL_ICON_CHANGE";
    MessageType[MessageType["CHANNEL_PINNED_MESSAGE"] = 6] = "CHANNEL_PINNED_MESSAGE";
    MessageType[MessageType["USER_JOIN"] = 7] = "USER_JOIN";
    MessageType[MessageType["GUILD_BOOST"] = 8] = "GUILD_BOOST";
    MessageType[MessageType["GUILD_BOOST_TIER_1"] = 9] = "GUILD_BOOST_TIER_1";
    MessageType[MessageType["GUILD_BOOST_TIER_2"] = 10] = "GUILD_BOOST_TIER_2";
    MessageType[MessageType["GUILD_BOOST_TIER_3"] = 11] = "GUILD_BOOST_TIER_3";
    MessageType[MessageType["CHANNEL_FOLLOW_ADD"] = 12] = "CHANNEL_FOLLOW_ADD";
    MessageType[MessageType["GUILD_DISCOVERY_DISQUALIFIED"] = 14] = "GUILD_DISCOVERY_DISQUALIFIED";
    MessageType[MessageType["GUILD_DISCOVERY_REQUALIFIED"] = 15] = "GUILD_DISCOVERY_REQUALIFIED";
    MessageType[MessageType["GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING"] = 16] = "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING";
    MessageType[MessageType["GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING"] = 17] = "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING";
    MessageType[MessageType["THREAD_CREATED"] = 18] = "THREAD_CREATED";
    MessageType[MessageType["REPLY"] = 19] = "REPLY";
    MessageType[MessageType["CHAT_INPUT_COMMAND"] = 20] = "CHAT_INPUT_COMMAND";
    MessageType[MessageType["THREAD_STARTER_MESSAGE"] = 21] = "THREAD_STARTER_MESSAGE";
    MessageType[MessageType["GUILD_INVITE_REMINDER"] = 22] = "GUILD_INVITE_REMINDER";
    MessageType[MessageType["CONTEXT_MENU_COMMAND"] = 23] = "CONTEXT_MENU_COMMAND";
    MessageType[MessageType["AUTO_MODERATION_ACTION"] = 24] = "AUTO_MODERATION_ACTION";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class Message extends Base_1.default {
    static async build(spot, id, channel) {
        const message = new Message(spot, id, channel);
        await __classPrivateFieldGet(message, _Message_instances, "m", _Message_props).call(message);
        return message;
    }
    constructor(spot, id, channel) {
        super(spot);
        _Message_instances.add(this);
        this.id = id;
        this.channel = channel;
    }
    async reply(...sendable) {
        const messageData = await this.spot.api.channels.generateMessageData(sendable);
        messageData.message_reference = { message_id: this.id };
        const message = await this.spot.api.channels.createMessage(this._channelId, messageData);
        return new Message(this.spot, message.id, message.channel_id);
    }
    async delete() {
        await this.spot.api.channels.deleteMessage(this._channelId, this.id);
    }
    get author() {
        return this._author;
    }
    get channelId() {
        return this._channelId;
    }
    get content() {
        return this._content;
    }
    get createdTimestamp() {
        return this._timestamp;
    }
    get editedTimestamp() {
        return this._editedTimestamp;
    }
    get isTTS() {
        return this._tts;
    }
    get isPinned() {
        return this._pinned;
    }
    get mentionHandler() {
        return new MentionHandler_1.default(this, this._mentionEveryone, this._mentions, this._mentionRoles, this._mentionChannels);
    }
    get embeds() {
        return this._embeds;
    }
    get type() {
        return this._type;
    }
}
exports.default = Message;
_Message_instances = new WeakSet(), _Message_props = async function _Message_props() {
    const message = await this.spot.api.channels.getMessage(this.channel.id, this.id);
    this._channelId = message.channel_id;
    this._author = await User_1.default.build(this.spot, message.author.id);
    this._content = message.content;
    this._timestamp = message.timestamp;
    this._editedTimestamp = message.edited_timestamp;
    this._tts = message.tts;
    this._mentionEveryone = message.mention_everyone;
    this._mentions = await message.mentions.map(async (mention) => await User_1.default.build(this.spot, mention.id));
    this._mentionRoles = await message.mention_roles.map(async (role) => await Role_1.default.build(this.spot, role.id));
    this._mentionChannels = message.mention_channels ? await message.mention_channels.map(async (channel) => await BaseChannel_1.default.build(this.spot, channel.id)) : undefined;
    this._embeds = message.embeds;
    this._pinned = message.pinned;
    this._type = message.type;
};
