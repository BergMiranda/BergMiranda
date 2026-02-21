import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { fail } from '../utils/http';

export interface AuthRequest extends Request {
  user?: { id: string; role: 'ADMIN' | 'MANAGER' | 'MECHANIC' };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return fail(res, 'Unauthorized', 401);
  try {
    req.user = jwt.verify(token, env.jwtSecret) as AuthRequest['user'];
    next();
  } catch {
    return fail(res, 'Invalid token', 401);
  }
};

export const authorize = (...roles: Array<'ADMIN' | 'MANAGER' | 'MECHANIC'>) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return fail(res, 'Forbidden', 403);
    next();
  };
