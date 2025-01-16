import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ValiError } from 'valibot';
import { HttpException } from '../utils/http-exception.js';
import { logError } from '../utils/logger.js';

export function errorHandler(
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV !== 'production') {
    logError(error);
  }
  if (error instanceof ValiError) {
    response.status(400).json({
      statusCode: 400,
      statusMessage: error.message
    });
  }
  if (error instanceof HttpException) {
    response.status(error.statusCode).json({
      statusCode: error.statusCode,
      statusMessage: error.statusMessage
    });
  }
  if (error.name == 'JsonWebTokenError') {
    response.status(401).json({
      statusCode: 401,
      statusMessage: 'invalid token'
    });
  }
  next(error);
}
