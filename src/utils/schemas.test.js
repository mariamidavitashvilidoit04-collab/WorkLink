import { describe, expect, it } from "vitest";
import { registerSchema, loginSchema } from "./schemas";

describe("WorkLink form validation", () => {
  it("accepts a valid freelancer registration", async () => {
    await expect(
      registerSchema.validate({
        name: "Alex",
        email: "alex@example.com",
        password: "password123",
        role: "freelancer",
      }),
    ).resolves.toMatchObject({ email: "alex@example.com", role: "freelancer" });
  });

  it("rejects an invalid email and short password", async () => {
    await expect(
      registerSchema.validate({
        name: "Alex",
        email: "not-an-email",
        password: "123",
        role: "client",
      }),
    ).rejects.toThrow();
  });

  it("requires a valid email for login", async () => {
    await expect(
      loginSchema.validate({ email: "bad", password: "password123" }),
    ).rejects.toThrow();
  });
});
