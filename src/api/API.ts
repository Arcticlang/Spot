import fetch, { RequestInit, BodyInit } from 'node-fetch';
import { apiPath } from "../constants";
import Spot from "../Spot";
import { Method } from "../types";
import ChannelAPI from './ChannelAPI';
import GuildAPI from './GuildAPI';
import UserAPI from './UserAPI';

export default class API {
    readonly spot: Spot;
    readonly channels: ChannelAPI;
    readonly guilds: GuildAPI;
    readonly users: UserAPI;

    constructor(spot: Spot) {
        this.spot = spot;
        this.users = new UserAPI(this);
        this.channels = new ChannelAPI(this);
        this.guilds = new GuildAPI(this);
    }

    async call(
        path: string,
        body: object|undefined = undefined,
        method: Method = "GET",
        options: object = {}
    ) {
        const token = this.spot.config.token;
        if(!token)
            throw new Error("\x1b[31m[ ERROR ] \x1b[0mToken is missing. \n\n\x1b[36m[ i ] Please make sure that you have a token inside of bot.config.ts\x1b[0m");
        const request: RequestInit = {
            body: JSON.stringify(body) as BodyInit,
            method,
            headers: {
                Accept: "*/*",
                Authorization: `Bot ${token}`,
                "Content-Type": "application/json"
            },
            ...options
        };

        const res = await fetch(
            `${apiPath}${path}`,
            request
        );

        if(res.status != 200) 
            throw new Error(`Status: ${res.status} ${res.statusText}\n${await res.text()}`);

        return await res.json();
    }

}