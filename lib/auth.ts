import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { prisma } from './database';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, type: 'access' | 'refresh' = 'access'): TokenPayload | null => {
  try {
    const secret = type === 'access' ? process.env.JWT_SECRET! : process.env.JWT_REFRESH_SECRET!;
    return jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }
};

export const generateVerificationToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const getUserFromRequest = async (request: NextRequest) => {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) return null;
  
  const payload = verifyToken(token);
  if (!payload) return null;
  
  return await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, role: true, isVerified: true }
  });
};