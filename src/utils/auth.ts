import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from './http-exception.js';
import { tokenConfig } from './config.js';

const secretKey = tokenConfig.secretKey;

type CustomJwtPayload = jwt.JwtPayload & {
  username: string;
  email: string;
  id: number;
};

export function generateToken(payload: object) {
  return jwt.sign(payload, secretKey, { algorithm: 'HS256', expiresIn: '1h' });
}

export function extractToken(request: Request) {
  if (request.headers.authorization === undefined)
    throw new HttpException('token not found', 401);
  const token = request.headers.authorization.split(' ')[1];
  return token;
}

export function verifyToken(token: string) {
  jwt.verify(token, secretKey);
}

export function getDataFromToken(token: string) {
  return jwt.decode(token) as CustomJwtPayload;
}
