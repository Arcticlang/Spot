import Base from "../Base";
import BaseChannel from "../channel/BaseChannel";
import Spot from "../../Spot";
import Embed from "./Embed";
import User from "../user/User";
import Role from "../guild/role/Role";
import MentionHandler from "./MentionHandler";
import { Sendable } from '../../types';

export enum MessageType {
	DEFAULT = 0,
	RECIPIENT_ADD = 1,
	RECIPIENT_REMOVE = 2,
	CALL = 3,
	CHANNEL_NAME_CHANGE = 4,
	CHANNEL_ICON_CHANGE = 5,
	CHANNEL_PINNED_MESSAGE = 6,
	USER_JOIN = 7,
	GUILD_BOOST = 8,
	GUILD_BOOST_TIER_1 = 9,
	GUILD_BOOST_TIER_2 = 10,
	GUILD_BOOST_TIER_3 = 11,
	CHANNEL_FOLLOW_ADD = 12,
	GUILD_DISCOVERY_DISQUALIFIED = 14,
	GUILD_DISCOVERY_REQUALIFIED = 15,
	GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
	GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
	THREAD_CREATED = 18,
	REPLY = 19,
	CHAT_INPUT_COMMAND = 20,
	THREAD_STARTER_MESSAGE = 21,
	GUILD_INVITE_REMINDER = 22,
	CONTEXT_MENU_COMMAND = 23,
	AUTO_MODERATION_ACTION = 24,
}

export default class Message extends Base {
	static async build(spot: Spot, id: string, channel: BaseChannel) {
		const message = new Message(spot, id, channel);
		await message.#props();
		return message;
	}

	readonly id: string;
	readonly channel: BaseChannel;

	private _channelId!: string;
	private _author!: User;
	private _content!: string;
	private _timestamp!: string;
	private _editedTimestamp!: string;
	private _tts!: boolean;
	private _mentionEveryone!: boolean;
	private _mentions!: User[];
	private _mentionRoles!: Role[];
	private _mentionChannels!: BaseChannel[];
	private _embeds!: Embed[];
	private _pinned!: boolean;
	private _type!: MessageType;

	private constructor(spot: Spot, id: string, channel: BaseChannel) {
		super(spot);
		this.id = id;
		this.channel = channel;
	}

	async #props() {
		const message = await this.spot.api.channels.getMessage(
			this.channel.id,
			this.id
		);

		this._channelId = message.channel_id;
		this._author = await User.build(this.spot, message.author.id);
		this._content = message.content;

		this._timestamp = message.timestamp;
		this._editedTimestamp = message.edited_timestamp;

		this._tts = message.tts;

		this._mentionEveryone = message.mention_everyone;
		this._mentions = await message.mentions.map(
			async (mention: any) => await User.build(this.spot, mention.id)
		);
		this._mentionRoles = await message.mention_roles.map(
			async (role: any) => await Role.build(this.spot, role.id)
		);
		this._mentionChannels = message.mention_channels ? await message.mention_channels.map(
			async (channel: any) => await BaseChannel.build(this.spot, channel.id)
		) : undefined;

		this._embeds = message.embeds;
		this._pinned = message.pinned;
		this._type = message.type;
	}

	async reply(...sendable: Sendable[]) {
		const messageData = await this.spot.api.channels.generateMessageData(sendable);
		messageData.message_reference = { message_id: this.id };
		const message = await this.spot.api.channels.createMessage(this._channelId, messageData);
		
		return new Message(this.spot, message.id, message.channel_id);
	}

	async delete() {
		await this.spot.api.channels.deleteMessage(this._channelId, this.id);
	}

	get author() {
		return this._author;
	}

	get channelId() {
		return this._channelId;
	}

	get content() {
		return this._content;
	}

	get createdTimestamp() {
		return this._timestamp;
	}

	get editedTimestamp() {
		return this._editedTimestamp;
	}

	get isTTS() {
		return this._tts;
	}

	get isPinned() {
		return this._pinned;
	}

	get mentionHandler() {
		return new MentionHandler(this, this._mentionEveryone, this._mentions, this._mentionRoles, this._mentionChannels);
	}

	get embeds() {
		return this._embeds;
	}

	get type() {
		return this._type;
	}

}
