import { supportsAnsi } from './supports_ansi'

export const apiVersion = 9;
export const apiPath = `https://discord.com/api/v${apiVersion.toString()}`;
export const gateway = `wss://gateway.discord.gg/?v=${apiVersion.toString()}&encoding=json`;

const supports_ansi = supportsAnsi();

export function getattr(obj: any, prop: string, defaultValue: any=null) {
    if(obj.hasOwnProperty(prop)) {
        let val = obj[prop];
        if(typeof val === "function")
            return val.bind(obj);
        return val;
    }

    if(arguments.length > 2) {
        return defaultValue;
    }

    if (supports_ansi) throw new TypeError(`\x1b[31m[ ERROR ]\x1b[0m "${obj}" object has no attribute "${prop}"`);
    if (!supports_ansi) throw new TypeError(`[ ERROR ] "${obj}" object has no attribute "${prop}"`);
}
