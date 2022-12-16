import { describe, expect, it, vi } from "vitest";
import { isDev } from "./is-dev.validation";

describe("IsDevValidation", () => {
  it("should return true when id is admin", () => {
    const done = vi.fn(() => true);
    const fail = vi.fn(() => false);

    vi.spyOn(process, "env", "get").mockReturnValue({
      OWNERS: "1",
    });

    const validate = isDev({ done, fail });

    expect(validate("1")).toBe(true);
    expect(done).toBeCalledTimes(1);
    expect(fail).toBeCalledTimes(0);

    expect(validate("2")).toBe(false);
    expect(done).toBeCalledTimes(1);
    expect(fail).toBeCalledTimes(1);
  });
});
