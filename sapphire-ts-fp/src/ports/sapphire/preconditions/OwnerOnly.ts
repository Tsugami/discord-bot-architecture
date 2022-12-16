import { AllFlowsPrecondition } from "@sapphire/framework";
import type {
  CommandInteraction,
  ContextMenuInteraction,
  Message,
  Snowflake,
} from "discord.js";
import { envParseArray } from "#lib/env-parser";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";

const OWNERS = envParseArray("OWNERS");

export class UserPrecondition extends AllFlowsPrecondition {
  #message = "This command can only be used by the owner.";

  public override chatInputRun(interaction: CommandInteraction) {
    return this.doOwnerCheck(interaction.user.id);
  }

  public override contextMenuRun(interaction: ContextMenuInteraction) {
    return this.doOwnerCheck(interaction.user.id);
  }

  public override messageRun(message: Message) {
    return this.doOwnerCheck(message.author.id);
  }

  private doOwnerCheck(userId: Snowflake) {
    return pipe(
      OWNERS,
      O.chain((ids) => (ids.includes(userId) ? O.some(true) : O.none)),
      O.match(
        () => this.error({ message: this.#message }),
        () => this.ok()
      )
    );
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    OwnerOnly: never;
  }
}
