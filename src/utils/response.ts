import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function sendError(res: Response, message: string, errorCode: number = StatusCodes.BAD_REQUEST): void {
  res.status(errorCode).json({
    message,
  });
}
