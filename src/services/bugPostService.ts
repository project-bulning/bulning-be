import type { User } from '@prisma/client';
import { CreateBugReportRequestBody } from '@/dto/reportDto';
import prisma from '@/utils/database';
import { BugReportCreateInputSchema } from '../../prisma/generated/zod';
import { isValidS3Url } from '@/utils/upload';

export const createBugReport = (data: CreateBugReportRequestBody, user: User) => {
  if(data.bug_image_url && ! isValidS3Url(data.bug_image_url)) {
    throw new Error('올바르지 않은 이미지 URL입니다.');
  }
  if(data.price < 0) {
    throw new Error('값이 0보다 작을 수 없습니다.');
  }
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

