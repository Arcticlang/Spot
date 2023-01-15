import { Embed } from "./classes";

export type SpotConfiguration = {
	/**
	 * The name of the bot
	 */
    name: string;
	/**
	 * The token required for the bot to be run.
	 */
    token: string;
	/**
	 * Optional version, used for help commands.
	 */
    version?: string;
	/**
	 * This will allow for the "Command" decorator.
	 * Note: This *will* enable message content.
	 */
	useCustomCommands?: boolean;
	/**
	 * This is required if 'useCustomCommands' is enabled.
	 */
	prefix?: string;
	/**
	 * This is needed to be enabled if you want to use message content.
	 */
	enableMessageContent: boolean;
	// logRegisteredEvents?: boolean;
	// logRegisteredCommands?: boolean;

	enableStartingMessage: boolean;

    // logs
    
    logsEnabled: boolean;
    logDateFormat: string;
}

export type Method = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export type Events =
	| "ready"
	| "resumed"
	| "reconnect"
	| "invalid_session"
	| "application_command_permissions_update"
	| "auto_moderation_rule_create"
	| "auto_moderation_rule_update"
	| "auto_moderation_rule_delete"
	| "auto_moderation_action_execution"
	| "channel_create"
	| "channel_update"
	| "channel_delete"
	| "channel_pins_update"
	| "thread_create"
	| "thread_update"
	| "thread_delete"
	| "thread_list_sync"
	| "thread_member_update"
	| "thread_members_update"
	| "guild_create"
	| "guild_update"
	| "guild_ban_add"
	| "guild_ban_remove"
	| "guild_stickers_update"
	| "guild_member_add"
	| "guild_member_remove"
	| "guild_member_update"
	| "guild_members_chunk"
	| "guild_role_create"
	| "guild_role_update"
	| "guild_role_delete"
	| "guild_scheduled_event_create"
	| "guild_scheduled_event_update"
	| "guild_scheduled_event_delete"
	| "guild_scheduled_event_user_add"
	| "guild_scheduled_event_user_remove"
	| "intergration_create"
	| "intergration_update"
	| "intergration_delete"
	| "interaction_create"
	| "invite_create"
	| "invite_delete"
	| "message_create"
	| "message_update"
	| "message_delete"
	| "message_delete_bulk"
	| "message_reaction_add"
	| "message_reaction_remove"
	| "message_reaction_remove_all"
	| "message_reaction_remove_emoji"
	| "presence_update"
	| "stage_isntance_create"
	| "stage_isntance_update"
	| "stage_isntance_delete"
	| "typing_start"
	| "user_update"
	| "voice_state_update"
	| "voice_server_update"
	| "webhooks_update";

export type Sendable = | string | Embed;
