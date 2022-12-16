interface ConfigData {
	OWNERS: string[];
	DISCORD_TOKEN: string;
}

export class ConfigService {
	private _config(): ConfigData {
		return {
			OWNERS: process.env.OWNERS?.split(',') ?? [],
			DISCORD_TOKEN: process.env.DISCORD_TOKEN!
		};
	}

	get<K extends keyof ConfigData>(key: K): ConfigData[K] {
		return this._config()[key];
	}
}
