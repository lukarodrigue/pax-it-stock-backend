import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { userRepository } from '../repositories/user.repository.js';
import { UnauthorizedError } from '../utils/AppError.js';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token não informado');
    }

    const token = header.slice(7);

    let payload: jwt.JwtPayload;

    try {
      payload = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
    } catch {
      throw new UnauthorizedError('Token inválido ou expirado');
    }

    const user = await userRepository.findById(payload.sub as string);

    if (!user || !user.active) {
      throw new UnauthorizedError('Usuário sem acesso');
    }

    req.user = { id: user.id, name: user.name, email: user.email };

    next();
  } catch (error) {
    next(error);
  }
}