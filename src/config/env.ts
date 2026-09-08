import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET precisa ter ao menos 32 caracteres'),
  JWT_EXPIRES_IN: z
  .string()
  .regex(/^\d+[smhd]$/, 'Use formato como 8h, 30m, 7d')
  .default('8h')
  .transform((v) => v as `${number}${'s' | 'm' | 'h' | 'd'}`),
  PORT: z.coerce.number().default(3333),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Variáveis de ambiente inválidas:', z.treeifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;