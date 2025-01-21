import { z } from 'zod';
import type { Chat } from '@prisma/client';

type SocketMessageType = 'read' | 'write' | 'close';
export interface SocketMessage {
  message_type: SocketMessageType;
}
export interface ReadChatRequest extends SocketMessage { // 클라이언트 -> 서버
}
export interface WriteChatRequest extends SocketMessage { // 클라이언트 -> 서버
  content: string;
}
export type MessageBody = Chat // 서버 -> 클라이언트

export const WriteChatRequestSchema = z.object({
  content: z.string().max(255),
});
export interface CloseChatRequest extends SocketMessage {
}
