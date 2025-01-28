import { WebSocket } from 'ws';
import { SocketStatusCodes } from '@/domains/chat/constant';

export function closeSocket(ws: WebSocket, message: string, errorCode: number = SocketStatusCodes.BAD_REQUEST): void {
  ws.close(errorCode, JSON.stringify({
    message,
  }));
}
