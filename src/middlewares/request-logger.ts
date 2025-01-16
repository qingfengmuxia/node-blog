import { NextFunction, Request, Response } from 'express';
import { logInfo } from '../utils/logger.js';

export function requestLogger(
  request: Request,
  response: Response,
  next: NextFunction
) {
  logInfo('Path: ', request.path);
  logInfo('Method: ', request.method);
  logInfo('Body: ', request.body);
  logInfo('---------------');
  next();
}
