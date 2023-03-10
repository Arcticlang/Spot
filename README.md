# Spot

Spot: Take the hassle of making a discord bot.

## Installation

Run the following command in your node project:

```shell
npm i discord-spot
```

## Example

```ts
import {
	Spot,
	Command,
	CommandListener,
	EventListener,
	Event,
	Message,
} from "discord-spot";

@CommandListener
@EventListener
class TestBot extends Spot {
	constructor() {
		super();

		this.run();
	}

	@Event("ready")
	onReady(spot: Spot) {
		console.log("Bot is ready.");
	}

	@Command("ping")
	flip(spot: Spot, message: Message, args: string[]) {
		message.reply("Pong!");
	}
}

new TestBot();
```

This code creates a ready event and a ping command.
For the bot to run, you will need to provide a token in your 'bot.config.ts'
You _must_ provide a **name** and a **token**.

```ts
import { SpotConfiguration } from "discord-spot";

export default {
	name: "Your Bot Name",
	token: "Your Bot Token",
} as SpotConfiguration;
```

You can set **enableMessageContent** to true to enable Message Content, You _must_ enable that in your Discord developer portal.
Note: This option will be ignored if the **useCustomCommands** property is enabled.

### Support

To get support for Spot join our [discord](https://discord.com/)

### Credit

[keqingrong/supports-ansi](https://github.com/keqingrong/supports-ansi) - Check whether terminal supports ANSI. 