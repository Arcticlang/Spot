"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MentionHandler {
    constructor(message, mentionsEveryone, mentions, roles, channels) {
        this.message = message;
        this.isEveryoneMentioned = mentionsEveryone || false;
        this.users = mentions;
        this.roles = roles;
        this.channels = channels;
    }
}
exports.default = MentionHandler;
