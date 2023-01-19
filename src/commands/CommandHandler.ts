import Spot from '../Spot';
import MessageCreateEvent from '../events/classes/MessageCreateEvent';

export default class CommandHandler {
    static commands: Map<string, Function> = new Map<string, Function>();

    static async tryCommand(spot: Spot, event: MessageCreateEvent) {
        if(!spot.config.useCustomCommands) return;
        const message = event.getMessage();

        let prefix = spot.config.prefix;
        if(!prefix) {
            console.error("No prefix defined, using '!' instead. Please change this in 'bot.config.ts'");
            prefix = "!";
        }

        if(message.sender.isBot) return;
        if(message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase();

        const cmd = CommandHandler.commands.get(command!);
        if(!cmd) return;

        await cmd(spot, message, args);
    }

}