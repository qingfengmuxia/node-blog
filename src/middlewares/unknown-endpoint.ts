import { Request, Response } from 'express';

export function unknownEndpoint(request: Request, response: Response) {
  response.json({
    statusCode: 404,
    statusMessage: 'unknown endpoint'
  });
}
