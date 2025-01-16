import { NextFunction, Request, Response } from 'express';
import { extractToken, getDataFromToken, verifyToken } from '../utils/auth.js';

export function authentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = extractToken(request);
  verifyToken(token);
  const payload = getDataFromToken(token);
  response.set('userId', payload.id.toString());
  next();
}
