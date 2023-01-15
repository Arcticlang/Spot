import { supportsAnsi } from '../supports_ansi'

export type ColorResolveable = | number | `#${string}` | [ number, number, number ];

export default class Color {
    static Default = new Color(0x000000);
    static White = new Color(0xFFFFFF);
    static Aqua = new Color(0x1ABC9C);
    static Green = new Color(0x57F287);
    static Blue = new Color(0x3498DB);
    static Yellow = new Color(0xFEE75C);
    static Purple = new Color(0x9B59B6);
    static LuminousVividPink = new Color(0xE91E63);
    static Fuchsia = new Color(0xEB459E);
    static Gold = new Color(0xF1C40F);
    static Orange = new Color(0xE67E22);
    static Red = new Color(0xED4245);
    static Grey = new Color(0x95A5A6);
    static Navy = new Color(0x34495E);
    static DarkAqua = new Color(0x11806A);
    static DarkGreen = new Color(0x1F8B4C);
    static DarkBlue = new Color(0x206694);
    static DarkPurple = new Color(0x71368A);
    static DarkVividPink = new Color(0xAD1457);
    static DarkGold = new Color(0xC27C0E);
    static DarkOrange = new Color(0xA84300);
    static DarkRed = new Color(0x992D22);
    static DarkGrey = new Color(0x979C9F);
    static DarkerGrey = new Color(0x7F8C8D);
    static LightGrey = new Color(0xBCC0C0);
    static DarkNavy = new Color(0x2C3E50);
    static Blurple = new Color(0x5865F2);
    static Greyple = new Color(0x99AAb5);
    static DarkButNotBlack = new Color(0x2C2F33);
    static NotQuiteBlack = new Color(0x23272A);

    private color: ColorResolveable;

    constructor(color: ColorResolveable) {
        this.color = this.trySet(color);
    }

    private trySet(color: ColorResolveable) {
        if(typeof color === "string" &&
            color.startsWith("#")) return this.fromHex(color);
            else if(color instanceof Array) return this.fromRgb(color); 
            else if(typeof color === "number") return color;

        // supportsAnsi() CAUSING ERRORS.
        throw new Error(`\x1b[31m[ ERROR ]\x1b[0m Color ${color} could not be converted into a valid decimal number.`);
    }

    private fromHex(hex: string) {
        return parseInt(hex, 16);
    }
    
    private fromRgb(rgb: [ number, number, number ]) {
        const r = rgb[0];
        const g = rgb[1];
        const b = rgb[2];
        return (r << 16) + (g << 8) + b;
    }

    getColor() {
        return this.color;
    }

    setColor(color: ColorResolveable) {
        this.color = this.trySet(color);
    }

}
