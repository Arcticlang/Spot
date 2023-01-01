import path from 'path';
import fs from "fs";
import WebSocket from "ws";

import { events } from './events/Listener'
import { SpotConfiguration } from './types';
import { gateway } from './constants';
import EventHandler from './events/EventHandler';
import API from './api/API';
import getIntents from './intents'

export enum CloseCodes {
    UNKNOWN = 4000,
    OPCODE = 4001,
    DECODE = 4002,
    NO_AUTH = 4003,
    ALREADY_AUTH = 4005,
    INVALID_SEQ = 4007,
    RATE_LIMITED = 4008,
    TIMED_OUT = 4009,
    INVALID_SHARD = 4010,
    SHARD_REQUIRED = 4011,
    INVAID_API_VERSION = 4012,
    INVALID_INTENTS = 4013,
    DISALLOWED_INTENTS = 4014
}

export default class Spot {
    readonly config: SpotConfiguration;
    readonly api: API;

    readonly ws: WebSocket;
    private interval: NodeJS.Timer;
    private payload: any;

    constructor() {
        this.config = this.loadConfig();

        this.api = new API(this);

        this.ws = new WebSocket(gateway);
        this.interval = null!;
        this.payload = {
            op: 2,
            d: {
                token: this.config.token,
                intents: 0,
                properties: {
                    os: "linux",
                    browser: "spot",
                    device: "spot",
                },
                presence: {
                    activities: [],
                    status: "online",
                    afk: false,
                    since: 91879201
                }
            }
        };
    }

    run() {
        this.ws.on("open", () => {
            this.payload.d.intents = getIntents(events, this.config)
            this.ws.send(JSON.stringify(this.payload));
        });

        this.ws.on("message", async (data) => {
            const { op, d, s, t } = JSON.parse(data.toString());

            switch(op) {
                case 10:
                    const { heartbeat_interval } = d;
                    this.interval = this.heartbeat(heartbeat_interval, s);
                    break;
            }

            console.log(events);

            await EventHandler.findEvent(this, t, d);
        });

        this.ws.on("close", (code, reason) => {
            const closeCode = code as CloseCodes;
            console.error(`Error: Gateway error code ${closeCode}.`);
        })
    }

    private heartbeat = (ms: number, s: number) => {
        const ws = this.ws;
        return setInterval(() => {
            ws.send(JSON.stringify({ op: 1, d: s })); 
        }, ms);
    }

    private loadConfig(): SpotConfiguration {
        const configPath = path.join(process.cwd(), "bot.config.ts");
        if(!fs.existsSync(configPath)) throw new Error("Bot configuration file not found! Please create one in the execution directory.");
        
        const loadedConfig = require(configPath);
        if(!loadedConfig.default) throw new Error("No default configuration found.");

        return loadedConfig.default as SpotConfiguration;
    }

}