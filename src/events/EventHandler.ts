import { getattr } from '../constants';
import Spot from '../Spot';
import BaseChannel from '../classes/channel/BaseChannel';
import Message from '../classes/message/Message';
import { events } from './Listener';
import CommandHandler from '../commands/CommandHandler';
import { Resume } from '../interfaces/Resume';

class EventHandler {

    constructor() {}

    async findEvent(spot: Spot, t: string, d: any) {
        switch(t) {
            case "MESSAGE_CREATE":
                const message = (await this.message_create(spot, d))[1];
                await CommandHandler.tryCommand(spot, message);
                break;
        }

        const registeredEvents = events.get(t);
        if(registeredEvents) {
            for(let i = 0; i < registeredEvents.length; i++) {
                const args = await this.get(t)(spot, d);
                const event = registeredEvents[i];
                event(...args);
            }
        }
    }

    get(name: string) {
        return getattr(this, name.toLowerCase(), this.noMethodFound);
    }

    async noMethodFound(spot: Spot, data: any): Promise<[Spot]> {
        return [ spot ];
    }

    ready = async(spot: Spot, data: any): Promise<[Spot]> => {
        return [ spot ];
    }

    resumed = async(spot: Spot, data: any): Promise<[Spot, Resume]> => {
        return [ spot, data as Resume ];
    }

    reconnect = async(spot: Spot, data: any): Promise<[Spot]> => {
        return [ spot ];
    }

    invalid_session = async(spot: Spot, data: any): Promise<[Spot, boolean]> => {
        return [ spot, data ];
    }

    application_command_permissions_update = async(spot: Spot, data: any): Promise<[Spot]> => {
        return [ spot ];
    }

    message_create = async(spot: Spot, data: any): Promise<[Spot, Message]> => {
        const channel = await BaseChannel.build(spot, data.channel_id);
        const message = await Message.build(spot, data.id, channel);
        return [ spot, message ];
    }

}

export default new EventHandler();