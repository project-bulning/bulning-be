import { Response } from 'express';
import { AuthenticatedRequest } from '@/types/express';
import { MatchAcceptBody, MatchAcceptParams } from '@/dto/matchDto';
import { sendError } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { setMatchStatus } from '@/services/match';

export const modifyMatch = async(req: AuthenticatedRequest<MatchAcceptParams, MatchAcceptBody>, res: Response) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }
  if(typeof req.body.accept == 'undefined' || !req.params.matchId) {
    return sendError(res, '잘못된 요청입니다.');
  }
  const accept = req.body.accept;
  try {
    await setMatchStatus(req.params.matchId, accept);
    res.status(StatusCodes.ACCEPTED);
  } catch(e) {
    console.error(e);
    sendError(res, '매치 상태 변경에 실패했습니다.', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
