import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const parseUser = (value: unknown): User =>
  UserSchema.parse(value);
