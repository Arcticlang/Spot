import { Sendable } from '../types';

export interface Sender {
    send(...sendable: Sendable[]): void|Promise<void>;
}