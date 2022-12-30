export const apiVersion = 9;
export const apiPath = `https://discord.com/api/v${apiVersion.toString()}`;
export const gateway = `wss://gateway.discord.gg/?v=${apiVersion.toString()}&encoding=json`;

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

    throw new TypeError(`"${obj}" object has no attribute "${prop}"`);
}