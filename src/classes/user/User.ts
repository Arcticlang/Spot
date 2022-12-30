import Base from "../Base";
import Spot from '../../Spot';
import { Color } from '../Color';
import { Nitro } from "./Nitro";
import { Sender } from "../../interfaces/Sender";
import { Sendable } from "../../types";
import BaseChannel from '../channel/BaseChannel';

export default class User extends Base implements Sender {
    static async build(spot: Spot, id: string) {
        const user = new User(spot, id);
        await user.#props();
        return user;
    }

    readonly id: string;

    private _username!: string;
    private _discriminator!: string;
    private _avatar!: string;
    private _bot!: boolean;
    private _system!: boolean;
    private _mfaEnabled!: boolean;
    private _banner!: string;
    private _accentColor!: Color;
    private _locale!: string;
    private _verified!: boolean;
    private _email!: string;
    private _premiumType!: Nitro;

    private constructor(spot: Spot, id: string) {
        super(spot);
        this.id = id;
    }

    async #props() {
        const user = await this.spot.api.users.getUser(this.id);

        this._username = user.username;
        this._discriminator = user.discriminator;
        this._avatar = user.avatar;
        this._bot = user.bot || false;
        this._system = user.system || false;
        this._mfaEnabled = user.mfa_enabled || false;
        this._banner = user.banner || undefined;
        this._accentColor = user.accent_color || undefined;
        this._locale = user.locale || "en-US";
        this._verified = user.verified || false;
        this._email = user.email || undefined;
        this._premiumType = user.premium_type || Nitro.NONE;
    }

    async makeDMs() {
        const channelData = await this.spot.api.users.createDM(this.id);
        const channel = await BaseChannel.build(this.spot, channelData.id);
        return channel;
    }

    async send(...sendable: Sendable[]) {
        const dms = await this.makeDMs();
        if(!dms) return;
        return await dms.send(...sendable);
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