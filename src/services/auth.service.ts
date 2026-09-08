import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { env } from '../config/env';

export const authService = {
  async register(data: { name: string; email: string; password: string }) {
    const existing = await userRepository.findByEmail(data.email);

    if (existing) {
      throw new Error('E-mail já cadastrado');
    }

    const passwordHash = await argon2.hash(data.password);

    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
    });

    return { id: user.id, name: user.name, email: user.email };
  },

  async login(data: { email: string; password: string }) {
    const user = await userRepository.findByEmail(data.email);

    if (!user || !user.active) {
      throw new Error('Credenciais inválidas');
    }

    const valid = await argon2.verify(user.password, data.password);

    if (!valid) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  },
};