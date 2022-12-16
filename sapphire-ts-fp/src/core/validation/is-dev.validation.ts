import { envParseArray } from "#lib/env-parser";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";

interface IsDevOptions<A> {
  done: () => A;
  fail: () => A;
}

export const isDev =
  <A>({ done, fail }: IsDevOptions<A>) =>
  (userId: string): A => {
    return pipe(
      envParseArray("OWNERS"),
      O.filter((ids) => ids.includes(userId)),
      O.match(fail, done)
    );
  };
