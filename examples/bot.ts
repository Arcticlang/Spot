import {
    Spot,
    Command,
    CommandListener,
    EventListener,
    Event,
    Message
} from "../src/index";

@CommandListener
@EventListener
class TestBot extends Spot {

    constructor() {
        super();

        this.run();
    }

    @Event("ready")
    onReady(spot: Spot) {
        console.log("Bot is ready.")
    }

    @Command("ping")
    flip(spot: Spot, message: Message, args: string[]) {
        message.reply("Pong!");
    }
}

new TestBot();
