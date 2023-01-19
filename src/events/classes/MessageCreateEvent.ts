import { Message } from "../../classes";
import Event from "./Event";

export default class MessageCreateEvent extends Event {
    private message: Message;

    constructor(message: Message) {
        super();
        this.message = message;
    }

    getMessage() {
        return this.message;
    }

    getSender() {
        return this.message.sender;
    }

}