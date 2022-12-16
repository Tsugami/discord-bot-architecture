import { CreateTodoCommand } from '#core/todos/create-todo.command';
import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { Subcommand } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';
import { prefixCommandContext } from '../../../../ports/sapphire/prefix-command-context';
import { container } from 'tsyringe';

@ApplyOptions<Subcommand.Options>({
	aliases: ['todo'],
	description: 'todo command',
	subcommands: [
		{
			name: 'add',
			messageRun: 'add'
		}
	]
})
export class UserCommand extends Subcommand {
	public createTodoCommand = container.resolve(CreateTodoCommand);

	public async add(message: Message, args: Args) {
		const text = await args.pick('string');
		const ctx = prefixCommandContext(message);

		return this.createTodoCommand.handler(ctx, message.author.id, text);
	}
}
