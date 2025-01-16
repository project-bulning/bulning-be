import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { WebSocket } from 'ws';
import { SocketStatusCodes } from '@/constants/socket';

export function sendError(res: Response, message: string, errorCode: number = StatusCodes.BAD_REQUEST): void {
  res.status(errorCode).json({
    message,
  });
}

export function closeSocket(ws: WebSocket, message: string, errorCode: number = SocketStatusCodes.BAD_REQUEST): void {
  ws.close(errorCode, JSON.stringify({
    message,
  }));
}
