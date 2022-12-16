type TFunction = (v: string) => string;

export interface CommandContext {
	t: TFunction;
	setEphemeral(v: boolean): CommandContext;
	wait(msg: string): Promise<void>;
	respond(msg: string): Promise<void>;
}
