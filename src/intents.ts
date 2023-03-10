import { SpotConfiguration } from './types';
const intents: Object = {
	// GUILDS
	GUILD_CREATE: [0],
	GUILD_UPDATE: [0],
	GUILD_DELETE: [0],
	GUILD_ROLE_CREATE: [0],
	GUILD_ROLE_UPDATE: [0],
	GUILD_ROLE_DELETE: [0],
	CHANNEL_CREATE: [0],
	CHANNEL_UPDATE: [0],
	CHANNEL_DELETE: [0],
	CHANNEL_PINS_UPDATE: [0],
	THREAD_CREATE: [0],
	THREAD_UPDATE: [0],
	THREAD_DELETE: [0],
	THREAD_LIST_SYNC: [0],
	THREAD_MEMBER_UPDATE: [0],
	THREAD_MEMBERS_UPDATE: [0, 1],
	STAGE_INSTANCE_CREATE: [0],
	STAGE_INSTANCE_UPDATE: [0],
	STAGE_INSTANCE_DELETE: [0],
	// GUILD_MEMBERS
	GUILD_MEMBER_ADD: [1],
	GUILD_MEMBER_UPDATE: [1],
	GUILD_MEMBER_REMOVE: [1],
	// GUILD_BANS
	GUILD_BAN_ADD: [2],
	GUILD_BAN_REMOVE: [2],
	// GUILD_EMOJIS_AND_STICKERS
	GUILD_EMOJIS_UPDATE: [3],
	GUILD_STICKERS_UPDATE: [3],
	// GUILD_INTEGRATIONS
	GUILD_INTEGRATIONS_UPDATE: [4],
	INTEGRATION_CREATE: [4],
	INTEGRATION_UPDATE: [4],
	INTEGRATION_DELETE: [4],
	// GUILD_WEBHOOKS
	WEBHOOKS_UPDATE: [5],
	// GUILD_INVITES
	INVITE_CREATE: [6],
	INVITE_DELETE: [6],
	// GUILD_VOICE_STATES
	VOICE_STATE_UPDATE: [7],
	// GUILD_PRESENCES
	PRESENCE_UPDATE: [8],
	// GUILD_MESSAGES
	MESSAGE_CREATE: [9, 12],
	MESSAGE_UPDATE: [9, 12],
	MESSAGE_DELETE: [9, 12],
	MESSAGE_DELETE_BULK: [9, 12],
	// GUILD_MESSAGE_REACTIONS
	MESSAGE_REACTION_ADD: [10, 13],
	MESSAGE_REACTION_REMOVE: [10, 13],
	MESSAGE_REACTION_REMOVE_ALL: [10, 13],
	MESSAGE_REACTION_REMOVE_EMOJI: [10, 13],
	// GUILD_MESSAGE_TYPING
	TYPING_START: [11, 14],
	// GUILD_SCHEDULED_EVENTS
	GUILD_SCHEDULED_EVENT_CREATE: [16],
	GUILD_SCHEDULED_EVENT_UPDATE: [16],
	GUILD_SCHEDULED_EVENT_DELETE: [16],
	GUILD_SCHEDULED_EVENT_USER_ADD: [16],
	GUILD_SCHEDULED_EVENT_USER_REMOVE: [16],
	// AUTO_MODERATION_CONFIGURATION
	AUTO_MODERATION_RULE_CREATE: [20],
	AUTO_MODERATION_RULE_UPDATE: [20],
	AUTO_MODERATION_RULE_DELETE: [20],
	// AUTO_MODERATION_EXECUTION
	AUTO_MODERATION_ACTION_EXECUTION: [21],
};
const privilegedIntents: Array<Number> = [1, 8] //GUILD MEMBER and GUILD PRESENCE

export default (
	events: Map<string, Function[]>,
	{ enableMessageContent, useCustomCommands }: SpotConfiguration,
	errorState: Boolean
) => {
	const eventArray: Array<String> = Array.from(events.keys());
	var intentBits: Array<Number> = Array(22).fill(0);

	eventArray.forEach((event) => {
		const intentBitShiftArray: Array<Number> = (
			intents as { [key: string]: any }
		)[event as string];
		if (intentBitShiftArray) {
			intentBitShiftArray.forEach((intentBitShift) => {
				if(errorState && privilegedIntents.includes(intentBitShift))	return;	
				intentBits[21 - (intentBitShift as number)] = 1;
			});
		}
	});
	if ((enableMessageContent || useCustomCommands) && !errorState) intentBits[21 - 15] = 1; //Change the bit for MESSAGE_CONTENT

	const intent: Number = parseInt(intentBits.join(""), 2);

	return intent;
};
