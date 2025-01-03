import type { User } from '@prisma/client';
import { CreateBugReportRequestBody } from '@/dto/reportDto';
import prisma from '@/utils/database';
import { sendError } from '@/utils/response';
import { BugReportCreateInputSchema } from '../../prisma/generated/zod';

export const createBugReport = (data: CreateBugReportRequestBody, user: User) => {
  const creationInput = {
    ...data,
    user: {
      connect: {
        id: user.id,
      }
    },
  }
  BugReportCreateInputSchema.parse(creationInput);
  return prisma.bugReport.create({
    data: creationInput,
  });
};

