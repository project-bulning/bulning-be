import { z } from 'zod';

export const WriteChatRequestSchema = z.object({
  content: z.string().max(255),
});
