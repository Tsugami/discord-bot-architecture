import type { CommandContext } from '#core/command/command-context.interface';
import type { TodoService } from './todo.service';

export class CreateTodoCommand {
	constructor(private readonly todoService: TodoService) {}

	async handler(ctx: CommandContext, user_id: string, description: string): Promise<void> {
		ctx.setEphemeral(true);

		await ctx.wait(ctx.t('todo:creating'));
		await this.todoService.create(user_id, description);

		await ctx.respond(ctx.t('todo:created'));
	}
}
