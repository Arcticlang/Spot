import CommandHandler from "./CommandHandler";

export const commandSymbol = Symbol("commands");

/**
 * This decorator will be used when registering commands.
 * Any command registered with the `Command` decorator will **requrie** this on all classes that have a command in it.
 * Commands will **only** be registered if the `useCustomCommands` property in `bot.config.ts`.
 * @param Base The base class that will be used for commands.
 * @returns 
 */
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

/**
 * This will register a custom command for the bot.
 * Commands will **only** be registered if the `useCustomCommands` property in `bot.config.ts`.
 * @param name The command name to be used for custom commands.
 * @returns
 */
export function Command(name: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target[commandSymbol] = target[commandSymbol] || new Array<[string, string]>();
        target[commandSymbol].push([name, propertyKey]);
    }
}