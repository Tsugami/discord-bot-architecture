import type { CommandContext } from '#core/command/command-context.interface';
import { describe, expect, it, vi } from 'vitest';
import { CreateTodoCommand } from './create-todo.command';
import type { TodoService } from './todo.service';

const serviceMock = (): TodoService => {
	return {
		create: vi.fn()
	} as unknown as TodoService;
};

const commandContextMock = (): CommandContext => {
	return {
		respond: vi.fn(),
		setEphemeral: vi.fn(),
		t: (v: string) => v,
		wait: vi.fn()
	};
};

describe('CreateTodoCommand', () => {
	it('should create a todo and send messages', async () => {
		const service = serviceMock();
		const context = commandContextMock();
		const command = new CreateTodoCommand(service);

		await command.handler(context, '__id__', 'new-todo');

		expect(context.setEphemeral).toBeCalledWith(true);
		expect(context.wait).toBeCalledTimes(1);
		expect(context.respond).toBeCalledWith('todo:created');
	});
});
