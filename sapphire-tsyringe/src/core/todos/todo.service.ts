interface Todo {
	id: string;
	description: string;
}

export class TodoService {
	private todos = new Map<string, Todo[]>();

	private randomId() {
		return Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, '')
			.substring(2, 10);
	}

	async create(discord_user_id: string, description: string): Promise<Todo> {
		const todos = this.todos.get(discord_user_id) ?? [];

		const newTodo = { id: this.randomId(), description };

		todos.push(newTodo);
		this.todos.set(discord_user_id, todos);

		return newTodo;
	}
}
