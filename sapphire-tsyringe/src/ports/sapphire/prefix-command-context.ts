import type { CommandContext } from '#core/command/command-context.interface';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
import { Translation } from '#ports/i18next/translation';

export const prefixCommandContext = (msg: Message) => {
	const i18n = new Translation();

	const ctx: CommandContext = {
		respond: async (v: string) => {
			await send(msg, v);
		},
		setEphemeral: () => {
			//...
			return ctx;
		},
		t: i18n.t,
		wait: async (v: string) => {
			await send(msg, v);
		}
	};

	return ctx;
};
