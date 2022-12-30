import API from "./API";

export default class GuildAPI {
	private api: API;

	constructor(api: API) {
		this.api = api;
	}

	async getRole(guild: string) {
		return this.api.call(`/guilds/${guild}/roles`);
	}
}
