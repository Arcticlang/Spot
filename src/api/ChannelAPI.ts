import { ChannelType } from "../classes/channel/BaseChannel";
import { OverwriteObject } from "../classes/channel/Overwrite";
import { VoiceQualityMode } from "../classes/channel/VoiceChannel";
import API from "./API";
import { Sendable } from '../types';
import { Embed } from "../classes";

// export interface ChannelObject {
// 	id: string;
// 	type: ChannelType;
// 	guild_id?: string;
// 	position?: string;
// 	permission_overwrites?: OverwriteObject[];
// 	name?: string;
// 	topic?: string;
// 	nsfw?: boolean;
// 	last_message_id?: string;
// 	bitrate?: number;
// 	user_limit?: number;
// 	rate_limit_per_user?: number;
// 	recipients?: UserObject[];
// 	icon?: string;
// 	owner_id?: string;
// 	application_id?: string;
// 	parent_id?: string;
// 	last_pin_timestamp?: number;
// 	rtc_region?: string;
// 	video_quality_mode?: VoiceQualityMode;
// 	message_count?: number;
// 	member_count?: number;
// 	default_auto_archive_duration?: number;
// 	permissions?: string;
// 	flags: number;
// }

export default class ChannelAPI {
	private api: API;

	constructor(api: API) {
		this.api = api;
	}

	async getChannel(channel: string) {
		return await this.api.call(
			`/channels/${channel}`
		);
	}

	async getMessages(channel: string) {
		return await this.api.call(
			`/channels/${channel}/messages`
		);
	}

	async deleteMessage(channel: string, message: string) {
		await this.api.call(
			`/channels/${channel}/messages/${message}`,
			undefined,
			"DELETE"
		);
	}

	async getMessage(channel: string, message: string) {
		return await this.api.call(
			`/channels/${channel}/messages/${message}`
		);
	}

	async replyMessage(channel: string, message_id: string, content: string, tts: boolean=false, body: any = {}) {
		return await this.api.call(
			`/channels/${channel}/messages`,
			{
				content,
				message_reference: { message_id },
				tts: !!tts,
				...body
			},
			"POST"
		);
	}

	async generateMessageData(sendables: Sendable[], body: any = {}) {
		let messageBody: any = {};

		for(let sendable of sendables) {
			this.messageBuilder(messageBody, sendable);
		}

		messageBody = {
			...messageBody,
			...body
		};
		return messageBody;
	}

	private async messageBuilder(body: any, sendable: Sendable) {
		if(sendable instanceof Embed) {
			body.embeds = body.embeds || [];
			body.embeds.push(sendable.toEmbed());
		} else if(typeof sendable === "string") {
			body.content = sendable;
		}
	}

	async createMessage(id: string, body: any = {}) {
		return await this.api.call(
			`/channels/${id}/messages`,
			body,
			"POST"
		);
	}
}
