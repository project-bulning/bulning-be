import { Response } from 'express';
import { sendError } from '@/utils/response';
import {CreateUserReviewRequestBody} from '@/domains/review/types';
import { AuthenticatedRequest } from '@/types/express';
import { StatusCodes } from 'http-status-codes';
import { createReview } from '@/domains/review/service';

// 헌터 리뷰 입력
export const ReviewController = async (
    req: AuthenticatedRequest<{matchId:string}, CreateUserReviewRequestBody>,
    res: Response
) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }
  const {matchId} = req.params;
  if (!matchId || isNaN(Number(matchId))){
    return sendError(res, '유효한 match ID가 필요합니다.');
  }

  try {
    await createReview(Number(matchId),req.body, req.user);
    res.status(StatusCodes.CREATED).send();
  } catch(e) {
    console.error(e);
    return sendError(res, '리뷰 작성에 실패했습니다.',500);
  }
};
