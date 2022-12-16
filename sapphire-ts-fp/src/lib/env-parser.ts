import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

export function envParseArray(key: 'OWNERS', defaultValue?: string[]): O.Option<string[]> {
	return pipe(
		process.env[key],
		O.fromNullable,
		O.map((str) => str.split(' ')),
		O.alt(() => pipe(defaultValue, O.fromNullable))
	);
}
