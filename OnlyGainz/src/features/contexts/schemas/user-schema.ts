import { z } from "zod";

export const AppwriteUserSchema = z.object({
  $id: z.string(),
  $createdAt: z.string(),
  $updatedAt: z.string(),
  accessedAt: z.string(),

  email: z.string().email(),
  emailCanonical: z.string().email(),
  emailIsCanonical: z.boolean(),
  emailIsCorporate: z.boolean(),
  emailIsDisposable: z.boolean(),
  emailIsFree: z.boolean(),
  emailVerification: z.boolean(),

  impersonator: z.boolean(),
  impersonatorUserId: z.string().nullable(),

  labels: z.array(z.string()),

  mfa: z.boolean(),

  name: z.string(),

  passwordPwned: z.boolean(),
  passwordUpdate: z.string(),

  phone: z.string(),
  phoneVerification: z.boolean(),

  prefs: z.record(z.any()),

  registration: z.string(),
  status: z.boolean(),

  targets: z.array(
    z.object({
      $id: z.string(),
      $createdAt: z.string(),
      $updatedAt: z.string(),
      expired: z.boolean(),
      identifier: z.string(),
      name: z.string(),
      providerId: z.string().nullable(),
      providerType: z.string(), // "email"
      userId: z.string(),
    })
  ),
});

export const UserSchema = AppwriteUserSchema.pick({
  $id: true,
  email: true,
  name: true,
  status: true,
});

export type User = z.infer<typeof UserSchema>;

export type AppwriteUser = z.infer<typeof AppwriteUserSchema>;
