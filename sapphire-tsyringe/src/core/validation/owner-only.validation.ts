import { ConfigService } from '#core/config/config.service';
import { injectable } from 'tsyringe';

@injectable()
export class OwnerOnlyValidation {
	constructor(private readonly config: ConfigService) {}

	validate(userId: string): boolean {
		return this.config.get('OWNERS').includes(userId);
	}
}
