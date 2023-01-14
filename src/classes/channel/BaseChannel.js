"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _BaseChannel_instances, _BaseChannel_props;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelType = void 0;
const Base_1 = __importDefault(require("../Base"));
var ChannelType;
(function (ChannelType) {
    ChannelType[ChannelType["TEXT"] = 0] = "TEXT";
    ChannelType[ChannelType["DM"] = 1] = "DM";
    ChannelType[ChannelType["VOICE"] = 2] = "VOICE";
    ChannelType[ChannelType["GROUP"] = 3] = "GROUP";
    ChannelType[ChannelType["CATEGORY"] = 4] = "CATEGORY";
    ChannelType[ChannelType["ANNOUNCEMENT"] = 5] = "ANNOUNCEMENT";
    ChannelType[ChannelType["ANNOUNCEMENT_THREAD"] = 10] = "ANNOUNCEMENT_THREAD";
    ChannelType[ChannelType["PUBLIC_THREAD"] = 11] = "PUBLIC_THREAD";
    ChannelType[ChannelType["PRIVATE_THREAD"] = 12] = "PRIVATE_THREAD";
    ChannelType[ChannelType["STAGE_VOICE"] = 13] = "STAGE_VOICE";
    ChannelType[ChannelType["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    ChannelType[ChannelType["FOURM"] = 15] = "FOURM";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
class BaseChannel extends Base_1.default {
    static async build(spot, id) {
        const channel = new BaseChannel(spot, id);
        await __classPrivateFieldGet(channel, _BaseChannel_instances, "m", _BaseChannel_props).call(channel);
        return channel;
    }
    constructor(spot, id) {
        super(spot);
        _BaseChannel_instances.add(this);
        this.id = id;
    }
    async send(...sendable) {
        return await this.spot.api.channels.createMessage(this.id, await this.spot.api.channels.generateMessageData(sendable));
    }
}
exports.default = BaseChannel;
_BaseChannel_instances = new WeakSet(), _BaseChannel_props = async function _BaseChannel_props() {
    const channel = await this.spot.api.channels.getChannel(this.id);
};
