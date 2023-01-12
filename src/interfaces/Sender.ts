import { Sendable } from '../types';
import Message from '../classes/message/Message';

export interface Sender {
    send(...sendable: Sendable[]): Message|Promise<Message>;
}

export function isSender(obj: object): obj is Sender {
    return "send" in obj;
}