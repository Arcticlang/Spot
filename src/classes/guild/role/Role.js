"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Role_instances, _Role_props;
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../../Base"));
const Color_1 = __importDefault(require("../../Color"));
class Role extends Base_1.default {
    static async build(spot, id) {
        const role = new Role(spot, id);
        await __classPrivateFieldGet(role, _Role_instances, "m", _Role_props).call(role);
        return role;
    }
    constructor(spot, id) {
        super(spot);
        _Role_instances.add(this);
        this.id = id;
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
exports.default = Role;
_Role_instances = new WeakSet(), _Role_props = async function _Role_props() {
    const role = await this.spot.api.guilds.getRole(this.id);
    this._name = role.name;
    this._color = role.color ? new Color_1.default(role.color) : Color_1.default.Default;
    this._hoist = role.hoist;
    this._icon = role.icon;
};
