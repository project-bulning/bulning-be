import { AuthenticatedRequest } from '@/types/express';
import { sendError } from '@/utils/response';
import { Response } from 'express';
import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

export const getMyInfo = async(req: AuthenticatedRequest, res: Response) => {
  if(! req.user) {
    sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
    return;
  }
  const ret: Partial<User> = {
    ...req.user
  };
  delete ret.kakao_id;
  res.json(ret);
}
