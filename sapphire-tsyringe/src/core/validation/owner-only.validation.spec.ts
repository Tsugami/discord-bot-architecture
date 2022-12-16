import 'reflect-metadata';

import { ConfigService } from '#core/config/config.service';

import { describe, expect, it, vi } from 'vitest';
import { OwnerOnlyValidation } from './owner-only.validation';

describe('OwnerOnlyValidation', () => {
	it('should returns TRUE when user exists in config', () => {
		const config = new ConfigService();
		const suit = new OwnerOnlyValidation(config);

		vi.spyOn(config, 'get').mockReturnValue(['1']);

		expect(suit.validate('1')).toBe(true);
	});

	it('should returns FALSE when user not exists in config', () => {
		const config = new ConfigService();
		const suit = new OwnerOnlyValidation(config);

		expect(suit.validate('1')).toBe(false);
	});
});
