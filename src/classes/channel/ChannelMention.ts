import { ChannelType } from './BaseChannel';

export interface ChannelMention {
    id: string;
    guild_id: string;
    type: ChannelType;
    name: string;
}