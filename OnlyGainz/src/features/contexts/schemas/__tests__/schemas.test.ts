// Enhetstester av Zod-skjemaene.
import { LoginSchema, RegisterSchema } from "../auth-schema";
import { AppwriteUserSchema, UserSchema } from "../user-schema";
import { fakeUser } from "@/test-utils/appwrite-fixtures";

describe("LoginSchema", () => {
  test("accepts a valid email and password", () => {
    const result = LoginSchema.safeParse({
      email: "test@test.no",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  test("rejects an invalid email", () => {
    const result = LoginSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid email");
  });

  test("rejects a password shorter than 8 characters", () => {
    const result = LoginSchema.safeParse({ email: "test@test.no", password: "123" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Password must be at least 8 characters",
    );
  });
});

describe("RegisterSchema", () => {
  test("rejects a name that is too short", () => {
    const result = RegisterSchema.safeParse({
      email: "test@test.no",
      password: "password123",
      name: "A",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Name is too short");
  });
});

describe("UserSchema", () => {
  test("picks only the fields the app needs from an Appwrite user", () => {
    const user = UserSchema.parse(AppwriteUserSchema.parse(fakeUser));
    expect(user).toEqual({
      $id: "user1",
      email: "test@test.no",
      name: "Ola",
      status: true,
    });
  });

  test("fails when a required field is missing", () => {
    const { email, ...withoutEmail } = fakeUser;
    expect(AppwriteUserSchema.safeParse(withoutEmail).success).toBe(false);
  });
});
