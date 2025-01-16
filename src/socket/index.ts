import type { WebSocket } from 'ws';
import * as http from 'node:http';
import { SocketStatusCodes } from '@/constants/socket';
import jwt from 'jsonwebtoken';
import { ExtendedJWTPayload } from '@/dto/authDto';
import prisma from '@/utils/database';
import { User } from '@prisma/client';
import { closeSocket } from '@/utils/response';

export const handleSocketConnection = async(ws: WebSocket, req: http.IncomingMessage) => {
  const token = req.url?.split('?token=')[1];
  if(! token) {
    ws.close(SocketStatusCodes.UNAUTHORIZED, JSON.stringify({
      message: '인증 정보가 없습니다.'
    }));
    return;
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined in environment variables');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as ExtendedJWTPayload | string;
    if (typeof decoded !== 'object' || !decoded.id) {
      closeSocket(ws, '토큰이 올바르지 않습니다.');
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    }) as User;
    ws.on('message', (message) => handleMessage(user, message.toString(), ws))
  } catch(e) {
    console.error(e);
    closeSocket(ws, '에러가 발생했습니다.');
  }
}

export const handleMessage = (user: User, message: string, ws: WebSocket) => {
  try {
    const data = JSON.parse(message);
    console.log(data);
  } catch(e) {
    console.error(e);
    closeSocket(ws, '에러가 발생했습니다.');
  }
}
