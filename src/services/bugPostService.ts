import type { User } from '@prisma/client';
import { CreateBugReportRequestBody } from '@/dto/reportDto';
import prisma from '@/utils/database';
import { sendError } from '@/utils/response';

export const createBugReport = (data: CreateBugReportRequestBody, user: User) => {
  return prisma.bugReport.create({
    data: {
      ...data,
      user_id: user.id,
    }
  });
};

