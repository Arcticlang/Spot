import CommandHandler from "./CommandHandler";

export const commandSymbol = Symbol("commands");

export function CommandListener<T extends { new(...args: any[]): {}}>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
            const listeners = Base.prototype[commandSymbol] as Array<[string, string]>;
            if(listeners) {
                listeners.forEach(([ command, property ]) => {
                    const method = ((this as any)[property] as Function);
                    if(!CommandHandler.commands.has(command)) CommandHandler.commands.set(command, method.bind(this));
                });
            }
        }
    }
}

export function Command(name: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target[commandSymbol] = target[commandSymbol] || new Array<[string, string]>();
        target[commandSymbol].push([name, propertyKey]);
    }
}