import { z } from "zod";

export const AppwriteSessionSchema = z.object({
  $id: z.string(),
  $createdAt: z.string(),
  $updatedAt: z.string(),

  clientCode: z.string(),
  clientEngine: z.string(),
  clientEngineVersion: z.string(),
  clientName: z.string(),
  clientType: z.string(),
  clientVersion: z.string(),

  countryCode: z.string(),
  countryName: z.string(),

  current: z.boolean(),

  deviceBrand: z.string(),
  deviceModel: z.string(),
  deviceName: z.string(),

  expire: z.string(),

  factors: z.array(z.string()),

  ip: z.string(),

  mfaUpdatedAt: z.string(),

  osCode: z.string(),
  osName: z.string(),
  osVersion: z.string(),

  provider: z.string(),
  providerAccessToken: z.string(),
  providerAccessTokenExpiry: z.string(),
  providerRefreshToken: z.string(),
  providerUid: z.string(),

  secret: z.string(),

  userId: z.string(),
});

export const SessionSchema = AppwriteSessionSchema.pick({
  $id: true,
  userId: true,
  expire: true,
  current: true,
});

export type AppwriteSession = z.infer<typeof AppwriteSessionSchema>;

export type Session = z.infer<typeof SessionSchema>;
