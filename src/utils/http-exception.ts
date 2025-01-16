export class HttpException extends Error {
  statusMessage: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'HttpException';
    this.statusCode = statusCode;
    this.statusMessage = message;
  }
}
