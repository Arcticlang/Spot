import API from "./API";

export default class UserAPI {
	private api: API;

	constructor(api: API) {
		this.api = api;
	}

	async getCurrent() {
		return await this.api.call(`/users/@me`);
	}

	async getUser(user: string) {
		return await this.api.call(`/users/${user}`);
	}

	async createDM(user: string) {
		return await this.api.call(
			`/users/@me/channels`,
			{
				recipient_id: user
			},
			"POST"
		);
	}
}
