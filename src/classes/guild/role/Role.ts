import Base from "../../Base";
import Spot from '../../../Spot';
import Color, { ColorResolveable } from '../../Color';

export default class Role extends Base {
    static async build(spot: Spot, id: string) {
        const role = new Role(spot, id);
        await role.#props();
        return role;
    }

    readonly id: string;

    private _name!: string;
    private _color!: Color;
    private _hoist!: boolean;
    private _icon!: string;
    private _unicodeEmoji!: string;
    private _position!: number;
    private _permissions!: string;
    private _managed!: boolean;
    private _mentionable!: boolean;

    private constructor(spot: Spot, id: string) {
        super(spot);
        this.id = id;
    }

    async #props() {
        const role = await this.spot.api.guilds.getRole(this.id);
        
        this._name = role.name;
        this._color = role.color ? new Color(role.color as ColorResolveable) : Color.Default;
        this._hoist = role.hoist;
        this._icon = role.icon;
    }

    get name() {
        return this._name;
    }

    getColor() {
        return this._color;
    }

    get isHoist() {
        return this._hoist;
    }

    getIcon() {
        return this._icon;
    }

    getUnicodeEmoji() {
        return this._unicodeEmoji;
    }

    get position() {
        return this._position;
    }

    get permissions() {
        return this._permissions;
    }

    get isManaged() {
        return this._managed;
    }

    get isMentionable() {
        return this._mentionable;
    }

}