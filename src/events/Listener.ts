import { Events } from "../types";

export const eventSymbol = Symbol("events"); // Map<string, Function[]>

export const events: Map<string, Function[]> = new Map();

export function EventListener<T extends { new(...args: any[]): {}}>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
            const listeners = Base.prototype[eventSymbol] as Array<[string, string]>;
            if(listeners) {
                listeners.forEach(([ event, property ]) => {
                    const method = ((this as any)[property] as Function);
                    if(!events.has(event)) events.set(event, []);
                    events.get(event)?.push(method.bind(this));
                });
            }
        }
    }
}

export function Event(name: Events) {
    const event = name.toUpperCase();

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target[eventSymbol] = target[eventSymbol] || new Array<[string, string]>();
        target[eventSymbol].push([event, propertyKey]);
    }
}