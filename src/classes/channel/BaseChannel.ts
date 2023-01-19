import { Sender } from "../../interfaces/Sender";
import Spot from "../../Spot";
import Base from "../Base";
import { Sendable } from "../../types";
import Editable from "../../interfaces/Editable";

export enum ChannelType {
	TEXT = 0,
	DM = 1,
	VOICE = 2,
	GROUP = 3,
	CATEGORY = 4,
	ANNOUNCEMENT = 5,
	ANNOUNCEMENT_THREAD = 10,
	PUBLIC_THREAD = 11,
	PRIVATE_THREAD = 12,
	STAGE_VOICE = 13,
	GUILD_DIRECTORY = 14,
	FOURM = 15,
}

export default class BaseChannel extends Base implements Sender, Editable {
	static async build(spot: Spot, id: string) {
		const channel = new BaseChannel(spot, id);
		await channel.#props();
		return channel;
	}

	readonly id: string;

	constructor(spot: Spot, id: string) {
		super(spot);
		this.id = id;
	}

	async #props() {
		const channel = await this.spot.api.channels.getChannel(this.id);
	}

	async send(...sendable: Sendable[]) {
		return await this.spot.api.channels.createMessage(
			this.id,
			await this.spot.api.channels.generateMessageData(sendable)
		);
	}

	async edit(...args: any[]): Promise<void> {
        
    }
}
