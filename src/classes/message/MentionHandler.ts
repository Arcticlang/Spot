import Role from '../guild/role/Role';
import User from '../user/User';
import Message from './Message';
import BaseChannel from '../channel/BaseChannel';

export default class MentionHandler {

    readonly message: Message;
    readonly isEveryoneMentioned: boolean;
    readonly users: User[];
    readonly roles: Role[];
    readonly channels: BaseChannel[];

    constructor(message: Message, mentionsEveryone: boolean, mentions: Array<User>, roles: Array<Role>, channels: Array<BaseChannel>) {
        this.message = message;
        this.isEveryoneMentioned = mentionsEveryone || false;
        this.users = mentions;
        this.roles = roles;
        this.channels = channels;
    }

}