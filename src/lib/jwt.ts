// src/lib/jwt.ts
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret-please-change';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
