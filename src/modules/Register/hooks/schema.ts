import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type registerSchemaType = z.infer<typeof registerSchema>;
