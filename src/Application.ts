import { User } from "./classes";
import Base from "./classes/Base";
import Spot from './Spot';

export default class Application extends Base {
    static async build(spot: Spot) {
        const application = new Application(spot);
        await application.#props();
        return application;
    }

    private _id!: string;
    private _name!: string;
    private _icon!: string;
    private _description!: string;
    private _rpcOrigins!: string[];
    private _botPublic!: boolean;
    private _botRequireCodeGrant!: boolean;
    private _termsOfServiceUrl!: string;
    private _privacyPolicyUrl!: string;
    private _owner!: User;
    private _verifyKey!: string;
    private _team!: string;

    private _guildId!: string;
    private _primarySkuId!: string;
    private _slug!: string;
    private _coverImage!: string;
    private _flags!: number;
    private _tags!: string[];
    private _installParams!: string;
    private _customInstallUrl!: string;
    private _roleConnectionsVerificationUrl!: string;

    private constructor(spot: Spot) {
        super(spot);
    }

    async #props() {
        const application = await this.spot.api.getApplication();
        
        this._id = application.id;
        this._name = application.name;
        this._icon = application.icon;
        this._description = application.description;
        this._rpcOrigins = application.rpc_origins;
        this._botPublic = application.bot_public;
        this._botRequireCodeGrant = application.bot_require_code_grant;
        this._termsOfServiceUrl = application.terms_of_service_url;
        this._privacyPolicyUrl = application.privacy_policy_url;
        this._owner = await User.build(this.spot, application.owner.id);
        this._verifyKey = application.verify_key;
        this._guildId = application.guild_id;
        this._primarySkuId = application.primary_sku_id;
        this._slug = application.slug;
        this._coverImage = application.cover_image;
        this._flags = application.flags;
        this._tags = application.tags;
        this._installParams = application.install_params;
        this._customInstallUrl = application.custom_install_url;
        this._roleConnectionsVerificationUrl = application.role_connections_verification_url;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get icon() {
        return this._icon;
    }

    get description() {
        return this._description;
    }

    get rpcOrigins() {
        return this._rpcOrigins;
    }

    get isPublic() {
        return this._botPublic;
    }

    get requireCodeGrand() {
        return this._botRequireCodeGrant;
    }

    get termsOfServiceUrl() {
        return this._termsOfServiceUrl;
    }

    get privacyPolicyUrl() {
        return this._privacyPolicyUrl;
    }

    get owner() {
        return this._owner;
    }

    get verifyKey() {
        return this._verifyKey;
    }

    get guildId() {
        return this._guildId;
    }

    get primarySKUId() {
        return this._primarySkuId;
    }

    get slug() {
        return this._slug;
    }

    get coverImage() {
        return this._coverImage;
    }

    get flags() {
        return this._flags
    }

    get tags() {
        return this._tags;
    }

    get installParams() {
        return this._installParams;
    }

    get customInstallUrl() {
        return this._customInstallUrl;
    }

    get roleConnectionsVerificationUrl() {
        return this._roleConnectionsVerificationUrl;
    }

}