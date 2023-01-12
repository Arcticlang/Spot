export const interactionSymbol = Symbol("interactions"); // Map<string, Function[]>

export const slashCommands: Map<string, Function[]> = new Map();

export type InteractionType = "SlashCommand";

/**
 * This decorator will be used when registering interactions.
 * @param Base The base class that will be used for interactions.
 * @returns
 */
export function InteractionListener<T extends { new (...args: any[]): {} }>(
	Base: T
) {
	return class extends Base {
		constructor(...args: any[]) {
			super(...args);
			const listeners = Base.prototype[interactionSymbol] as Array<
				[string, string, InteractionType]
			>;
			if (listeners) {
				listeners.forEach(([interaction, property, type]) => {
					const method = (this as any)[property] as Function;

					if (type == "SlashCommand") {
						if (!slashCommands.has(interaction))
							slashCommands.set(interaction, []);
						slashCommands.get(interaction)?.push(method.bind(this));
					}
				});
			}
		}
	};
}

/**
 * This will register a slash command for the bot.
 * @param name The command name to be used for custom commands.
 * @returns
 */
export function SlashCommand(name: string) {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		target[interactionSymbol] =
			target[interactionSymbol] ||
			new Array<[string, string, InteractionType]>();
		(
			target[interactionSymbol] as Array<
				[string, string, InteractionType]
			>
		).push([name, propertyKey, "SlashCommand"]);
	};
}
