import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { env } from '../config/env';

export const login = async (email: string, password: string) => {
  const user = await prisma.employee.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: '8h' });
  return { token, user: { id: user.id, role: user.role, name: user.name, email: user.email } };
};
