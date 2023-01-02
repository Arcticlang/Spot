import API from "./API";

export default class GuildAPI {
	private api: API;

	constructor(api: API) {
		this.api = api;
	}

	async getGuild(guild: string) {
		return await this.api.call(`/guilds/${guild}`, { with_counts: true });
	}

	async getRole(guild: string) {
		return await this.api.call(`/guilds/${guild}/roles`);
	}
}
