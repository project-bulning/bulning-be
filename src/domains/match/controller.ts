import { Response } from 'express';
import { AuthenticatedRequest } from '@/types/express';
import { MatchAcceptBody, MatchAcceptParams, MatchStatusResponseDto} from '@/domains/match/types';
import { sendError } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { setMatchStatus, getMatchStatusService } from '@/domains/match/service';

export const modifyMatch = async(req: AuthenticatedRequest<MatchAcceptParams, MatchAcceptBody>, res: Response) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }
  if(typeof req.body.accept == 'undefined' || !req.params.matchId) {
    return sendError(res, '잘못된 요청입니다.');
  }
  const {matchId} = req.params;
  if (isNaN(Number(matchId))){
    return sendError(res, '유효한 matchId가 필요합니다.');
  }
  const accept = req.body.accept;
  try {
    await setMatchStatus(Number(matchId), accept);
    res.status(StatusCodes.ACCEPTED).json({ message: '매치 상태가 변경되었습니다.' });
  } catch(e) {
    console.error(e);
    sendError(res, '매치 상태 변경에 실패했습니다.', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export const getMatchStatus = async(
  req: AuthenticatedRequest<{},{}>,
  res: Response<MatchStatusResponseDto|null>
) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }

  try{
    const matchStatus = await getMatchStatusService(req.user);

    res.status(StatusCodes.OK).json(matchStatus);
  } catch (error) {
    console.error("Error in getMatchStatus:", error);
    return sendError(res, "매치 상태를 조회하던 중 오류가 발생했습니다.", StatusCodes.INTERNAL_SERVER_ERROR);
  
  }

}
