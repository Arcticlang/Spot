import { Sendable } from '../types';

export interface Sender {
    send(...sendable: Sendable[]): void|Promise<void>;
}

export function isSender(obj: object): obj is Sender {
    return "send" in obj;
}