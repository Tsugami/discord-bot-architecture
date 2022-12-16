export class Translation {
	#data = {
		todo: {
			creating: '1 second, we are creating your note!',
			new_todo: 'Created!'
		}
	};

	t(v: string): string {
		const [scope, key] = v.split(':');

		//@ts-ignore
		return this.#data[scope][key];
	}
}
