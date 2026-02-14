import { Request, Response } from 'express';
import { login } from '../services/auth.service';
import { fail, ok } from '../utils/http';

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const data = await login(req.body.email, req.body.password);
    return ok(res, data);
  } catch (e) {
    return fail(res, (e as Error).message, 401);
  }
};
