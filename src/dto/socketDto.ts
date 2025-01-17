import { z } from 'zod';

type SocketMessageType = 'read' | 'write';
export interface SocketMessage {
  message_type: SocketMessageType;
}
export interface ReadChatRequest {
}
export interface WriteChatRequest {
  content: string;
  match_id: number;
}

export const WriteChatRequestSchema = z.object({
  content: z.string().max(200),
  match_id: z.number(),
});
