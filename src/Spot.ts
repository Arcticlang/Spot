import path from "path";
import fs from "fs";
import WebSocket from "ws";

import { events } from "./events/Listener";
import { SpotConfiguration } from "./types";
import { gateway } from "./constants";
import EventHandler from "./events/EventHandler";
import API from "./api/API";
import getIntents from "./intents";

import { supportsAnsi } from './supports_ansi'

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
	DISALLOWED_INTENTS = 4014,
}

const close_code_help = {
    "4000": "",
    "4001": "",
    "4002": "",
    "4003": "Check your configuration file for the correct token and bot name.",
    "4005": "",
    "4007": "",
    "4008": "Try again later.",
    "4009": "",
    "4010": "",
    "4011": "",
    "4012": "Check your API version",
    "4013": "",
    "4014": ""
}

let supports_ansi = supportsAnsi()

export default class Spot {
    readonly config: SpotConfiguration;
    readonly api: API;

    private ws: WebSocket;
    private interval: NodeJS.Timer;
    private payload: any;
    private intents: Number;

    public errorState: Boolean;

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
        if (this.config.enableStartingMessage || this.config.enableStartingMessage == undefined) {
            // print introduction message
            this.starting_msg();
        }

        this.errorState = false;
        this.intents = getIntents(events, this.config, this.errorState);
    }

    private starting_msg = () => {
        try {
            // read src/logo.txt, and print
            const logo = fs.readFileSync(path.join(__dirname, "logo.txt"), "utf-8");
            const lines = logo.split("\n"); // split the logo into individual lines (for iterating over)

            for (let line_index = 0; line_index < lines.length; line_index++) {
                let line_text = "";

                if (line_index == 1) line_text = "\x1b[32mVersion:\x1b[0m UNDEFINED";
                if (line_index == 2) line_text = `\x1b[32mBot Token:\x1b[0m ${this.config.token.slice(0,4)}...${this.config.token.slice(-4)}`;

                if (line_index == 6) line_text = "Enjoy using Spot!";
                if (line_index == 7) line_text = "https://spotdev.tk";

                console.log(`${lines[line_index]}      ${line_text}`); 
            }

        } catch (err) {
            // error occured while opening file
            
            if (supports_ansi) console.log("\x1b[31m[ ERROR ]\x1b[0m Error occured while reading starting message logo content. \x1b[38;5;59mDon't worry, this won't break anything.\x1b[0m");
            if (!supports_ansi) console.log("[ ERROR ] Error occured while reading starting message logo content. Don't worry, this won't break anything.");
        }
    }

    /**
     * Runs the bot using the token specified in `bot.config.ts`.
     * This is required for the bot to be able to run.
     */
    run() {
        this.ws.on("open", () => {
            this.payload.d.intents = this.intents;
            this.ws.send(JSON.stringify(this.payload));
        });

        this.ws.on("message", async (data) => {
            const { op, d, s, t } = JSON.parse(data.toString());

            switch(op) {
                case 10:
                    const { heartbeat_interval } = d;
                    clearInterval(this.interval);
                    this.interval = this.heartbeat(heartbeat_interval, s);
                    break;
            }

            await EventHandler.findEvent(this, t, d);
        });

        this.ws.on("close", (code, reason) => {
            const closeCode = code as CloseCodes;
            switch(code){
                case CloseCodes.DISALLOWED_INTENTS:
                    this.errorState = true;
                    this.intents = getIntents(events, this.config, this.errorState);
                    this.ws = new WebSocket(gateway);
                    this.run();
                    break;
                default:
                    if (supports_ansi) console.error(`\x1b[31m[ ERROR ]\x1b[0m Gateway error code \x1b[36m${closeCode}\x1b[0m for reason: \x1b[35m${reason}\x1b[0m`);
                    if (!supports_ansi) console.error(`[ ERROR ] Gateway error code ${closeCode} for reason: ${reason}.`);
            }
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
        if(!fs.existsSync(configPath)) {
            if (supports_ansi)  throw new Error("\x1b[31m[ FILE NOT FOUND ]\x1b[0m Bot configuration file not found! Please create one in the execution directory.");
            if (!supports_ansi) throw new Error("[ FILE NOT FOUND ] Bot configuration file not found! Please create one in the execution directory.");
        }
        
        const loadedConfig = require(configPath);
        if(!loadedConfig.default) throw new Error("No default configuration found.");

        return loadedConfig.default as SpotConfiguration;
    }

}
