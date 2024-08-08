import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(1, '1文字以上入力してください'),
});

export type LoginValue = z.infer<typeof LoginSchema>;
