import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome precisa ter ao menos 3 caracteres').trim(),
  email: z.email('E-mail inválido').toLowerCase().trim(),
  password: z.string().min(8, 'Senha precisa ter ao menos 8 caracteres'),
});

export const loginSchema = z.object({
  email: z.email('E-mail inválido').toLowerCase().trim(),
  password: z.string().min(1, 'Senha é obrigatória'),
});