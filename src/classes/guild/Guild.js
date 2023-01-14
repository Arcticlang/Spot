"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Guild_instances, _Guild_props;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumTier = exports.GuildNSFW = exports.MFA = exports.ExplicitContentFilter = exports.VerificationLevel = void 0;
const Base_1 = __importDefault(require("../Base"));
var VerificationLevel;
(function (VerificationLevel) {
    VerificationLevel[VerificationLevel["NONE"] = 0] = "NONE";
    VerificationLevel[VerificationLevel["LOW"] = 1] = "LOW";
    VerificationLevel[VerificationLevel["MEDIUM"] = 2] = "MEDIUM";
    VerificationLevel[VerificationLevel["HIGH"] = 3] = "HIGH";
    VerificationLevel[VerificationLevel["VERY_HIGH"] = 4] = "VERY_HIGH";
})(VerificationLevel = exports.VerificationLevel || (exports.VerificationLevel = {}));
var ExplicitContentFilter;
(function (ExplicitContentFilter) {
    ExplicitContentFilter[ExplicitContentFilter["DISABLED"] = 0] = "DISABLED";
    ExplicitContentFilter[ExplicitContentFilter["MEMBERS_WITHOUT_ROLES"] = 1] = "MEMBERS_WITHOUT_ROLES";
    ExplicitContentFilter[ExplicitContentFilter["ALL_MEMBERS"] = 2] = "ALL_MEMBERS";
})(ExplicitContentFilter = exports.ExplicitContentFilter || (exports.ExplicitContentFilter = {}));
var MFA;
(function (MFA) {
    MFA[MFA["NONE"] = 0] = "NONE";
    MFA[MFA["ELEVATED"] = 1] = "ELEVATED";
})(MFA = exports.MFA || (exports.MFA = {}));
var GuildNSFW;
(function (GuildNSFW) {
    GuildNSFW[GuildNSFW["DEFAULT"] = 0] = "DEFAULT";
    GuildNSFW[GuildNSFW["EXPLICIT"] = 1] = "EXPLICIT";
    GuildNSFW[GuildNSFW["SAFE"] = 2] = "SAFE";
    GuildNSFW[GuildNSFW["AGE_RESTRICTED"] = 3] = "AGE_RESTRICTED";
})(GuildNSFW = exports.GuildNSFW || (exports.GuildNSFW = {}));
var PremiumTier;
(function (PremiumTier) {
    PremiumTier[PremiumTier["NONE"] = 0] = "NONE";
    PremiumTier[PremiumTier["TIER_1"] = 1] = "TIER_1";
    PremiumTier[PremiumTier["TIER_2"] = 2] = "TIER_2";
    PremiumTier[PremiumTier["TIER_3"] = 3] = "TIER_3";
})(PremiumTier = exports.PremiumTier || (exports.PremiumTier = {}));
class Guild extends Base_1.default {
    static async build(spot, id) {
        const guild = new Guild(spot, id);
        await __classPrivateFieldGet(guild, _Guild_instances, "m", _Guild_props).call(guild);
        return guild;
    }
    constructor(spot, id) {
        super(spot);
        _Guild_instances.add(this);
        this.id = id;
    }
}
exports.default = Guild;
_Guild_instances = new WeakSet(), _Guild_props = async function _Guild_props() {
    const guild = await this.spot.api.guilds.getGuild(this.id);
    this._name = guild.name;
    this._icon = guild.icon;
    this._iconHash = guild.icon_hash;
    this._splash = guild.splash;
    this._discoverySplash = guild.discovery_splash;
    this._owner = guild.owner || false;
    this._ownerId = guild.owner_id;
    this._permissions = guild.permissions;
    this._region = guild.region;
    this._afkChannelId = guild.afk_channel_id;
    this._afkTimeout = guild.afk_timeout;
    this._widgetEnabled = guild.widget_enabled;
    this._widgetChannelId = guild.widget_channel_id;
    this._verificationLevel = guild.verification_level;
    this._defaultMessageNotifications = guild.default_message_notifications;
    this._explicitContentFilter = guild.explicit_content_filter;
    this._roles = guild.roles; // TODO: Map all roles a Role object.
};
