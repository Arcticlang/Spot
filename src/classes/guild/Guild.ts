import Spot from "../../Spot";
import Base from "../Base";
import Role from "./role/Role";

export enum VerificationLevel {
	NONE = 0,
	LOW = 1,
	MEDIUM = 2,
	HIGH = 3,
	VERY_HIGH = 4,
}

export enum ExplicitContentFilter {
    DISABLED = 0,
    MEMBERS_WITHOUT_ROLES = 1,
    ALL_MEMBERS = 2,
}

export enum MFA {
    NONE = 0,
    ELEVATED = 1
}

export enum GuildNSFW {
	DEFAULT = 0,
	EXPLICIT = 1,
	SAFE = 2,
	AGE_RESTRICTED = 3,
}

export enum PremiumTier {
	NONE = 0,
	TIER_1 = 1,
	TIER_2 = 2,
	TIER_3 = 3,
}

export type GuildFeature =
	| "ANIMATED_BANNER"
	| "ANIMATED_ICON"
	| "APPLICATION_COMMAND_PERMISSIONS_V2"
	| "AUTO_MODERATION"
	| "BANNER"
	| "COMMIUNITY"
	| "DEVELOPER_SUPPORT_SERVER"
    | "DISCOVERABLE"
    | "FEATUREABLE"
    | "INVITES_DISABLED"
    | "INVITE_SPLASH"
    | "MEMBER_VERIFICATION_GATE_ENABLED"
    | "MONETIZATION_ENABLED"
    | "MORE_STICKERS"
    | "NEWS"
    | "PARTNERED"
    | "PREVIEW_ENABLED"
    | "ROLE_ICONS"
    | "TICKETED_EVENTS_ENABLED"
    | "VANITY_URL"
    | "VERIFIED"
    | "VIP_REGIONS"
    | "WELCOME_SCREEN_ENABLED";

export type MutableGuildFeatures = | "COMMUNITY" | "INVITES_DISABLED" | "DISCOVERABLE";

export default class Guild extends Base {
	static async build(spot: Spot, id: string) {
		const guild = new Guild(spot, id);
		await guild.#props();
		return guild;
	}

	readonly id: string;

	private _name!: string;
	private _icon!: string;
	private _iconHash!: string;
	private _splash!: string;
	private _discoverySplash!: string;
	private _owner!: boolean;
	private _ownerId!: string;
	private _permissions!: string;
	private _region!: string;
	private _afkChannelId!: string;
	private _afkTimeout!: number;
	private _widgetEnabled!: boolean;
	private _widgetChannelId!: string;
	private _verificationLevel!: VerificationLevel;
	private _defaultMessageNotifications!: number;
	private _explicitContentFilter!: ExplicitContentFilter;
	private _roles!: Role[];
	private _emojis!: {}[]; // TODO: Emojis.
	private _features!: GuildFeature[];
	private _mfaLevel!: MFA;
	private _applicationId!: string;
	private _systemChannelId!: string;
	private _systemChannelFlags!: number;
	private _rulesChannelId!: string;
	private _maxPresences!: number;
	private _maxMembers!: number;
	private _vanityUrlCode!: string;
	private _description!: string;
	private _banner!: string;
	private _premiumTier!: PremiumTier;
	private _premiumSubscriptionCount!: number;
	private _preferredLocale!: string;
	private _publicUpdatesChannelId!: string;
	private _maxVideoChannelUsers!: string;
	private _approximateMemberCount!: string;
	private _approximatePresenceCount!: string;
	private _welcomeScreen!: {}; // TODO: Welcome screen
	private _nsfwLevel!: GuildNSFW;
	private _stickers!: {}[]; // TODO: Stickers.
	private _premiumProgressBarEnabled!: boolean;

	private constructor(spot: Spot, id: string) {
		super(spot);
		this.id = id;
	}

	async #props() {
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
        this._verificationLevel = guild.verification_level as VerificationLevel;
        this._defaultMessageNotifications = guild.default_message_notifications;
        this._explicitContentFilter = guild.explicit_content_filter as ExplicitContentFilter;
        this._roles = guild.roles; // TODO: Map all roles a Role object.
	}
}
