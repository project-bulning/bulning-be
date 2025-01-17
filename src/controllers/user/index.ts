import { AuthenticatedRequest } from '@/types/express';
import { sendError } from '@/utils/response';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Match, User } from '@prisma/client';
import { getMatchByUser } from '@/services/match';

export const getMyInfo = async(req: AuthenticatedRequest, res: Response) => {
  if(! req.user) {
    sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
    return;
  }
  const match = await getMatchByUser(req.user);
  const ret: Partial<User> & { match: Match | null } = {
    ...req.user,
    match,
  };
  delete ret.kakao_id;
  res.json(ret);
}
