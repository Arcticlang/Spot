"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _User_instances, _User_props;
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../Base"));
const Color_1 = __importDefault(require("../Color"));
const Nitro_1 = require("./Nitro");
const BaseChannel_1 = __importDefault(require("../channel/BaseChannel"));
class User extends Base_1.default {
    static async build(spot, id) {
        const user = new User(spot, id);
        await __classPrivateFieldGet(user, _User_instances, "m", _User_props).call(user);
        return user;
    }
    constructor(spot, id) {
        super(spot);
        _User_instances.add(this);
        this.id = id;
    }
    async makeDMs() {
        const channelData = await this.spot.api.users.createDM(this.id);
        this._channel = await BaseChannel_1.default.build(this.spot, channelData.id);
        return this._channel;
    }
    async send(...sendable) {
        const dms = await this.makeDMs();
        if (!dms)
            return;
        return await dms.send(...sendable);
    }
    get channel() {
        return this._channel;
    }
    getUsername() {
        return this._username;
    }
    getDiscriminator() {
        return this._discriminator;
    }
    getAvatar() {
        return this._avatar;
    }
    get isBot() {
        return this._bot;
    }
    get isSystem() {
        return this._system;
    }
    get has2Factor() {
        return this._mfaEnabled;
    }
    getBanner() {
        return this._banner;
    }
    getAccentColor() {
        return this._accentColor;
    }
    getLocale() {
        return this._locale;
    }
    get isVerified() {
        return this._verified;
    }
    getEmail() {
        return this._email;
    }
    getNitro() {
        return this._premiumType;
    }
}
exports.default = User;
_User_instances = new WeakSet(), _User_props = async function _User_props() {
    const user = await this.spot.api.users.getUser(this.id);
    this._username = user.username;
    this._discriminator = user.discriminator;
    this._avatar = user.avatar;
    this._bot = user.bot || false;
    this._system = user.system || false;
    this._mfaEnabled = user.mfa_enabled || false;
    this._banner = user.banner || undefined;
    this._accentColor = user.accent_color ? new Color_1.default(user.accent_color) : Color_1.default.Default;
    this._locale = user.locale || "en-US";
    this._verified = user.verified || false;
    this._email = user.email || undefined;
    this._premiumType = user.premium_type || Nitro_1.Nitro.NONE;
};
