import { Request, Response } from 'express';
import { sendError } from '@/utils/response';
import { AuthenticatedRequest } from '@/types/express';
import { StatusCodes } from 'http-status-codes';
import {
    GetBugReportPriceResponse, 
    TradeAcceptParams, 
    TradeAcceptBody
} from '@/domains/hunting/types';
import {
    BugReportPrice,
    setBugReportStatus
} from '@/domains/hunting/service';

//거래 취소, 거래 마치기 -> bugReport 상태 변경
export const modifyBugReportStatus = async(req: AuthenticatedRequest<TradeAcceptParams,TradeAcceptBody >, res: Response) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }
  if(typeof req.body.trade == 'undefined' || !req.params.matchId) {
    return sendError(res, '잘못된 요청입니다.');
  }

  const {matchId} = req.params;
  if (isNaN(Number(matchId))){
    return sendError(res, '유효한 matchId가 필요합니다.');
  }
  const trade = req.body.trade;

  try {
    await setBugReportStatus(Number(matchId), trade, req.user);
    res.status(StatusCodes.ACCEPTED).json({ message: 'bugReport 상태가 변경되었습니다.' });
  } catch(e) {
    console.error(e);
    sendError(res, 'bugReport 상태 변경에 실패했습니다.', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// 사냥 가격 조회
export const getBugReportPrice = async (
  req: AuthenticatedRequest<{matchId: string},{}>,
  res: Response<GetBugReportPriceResponse>
) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }

  try {
    const { matchId }  = req.params;
    console.log(Number(matchId))
    if (!matchId || isNaN(Number(matchId))) {
      return sendError(res, '유효한 match ID를 제공해야 합니다.');
    }

    const BugReportPriceRes = await BugReportPrice(Number(matchId));
    if (!BugReportPriceRes) {
      return sendError(res, '해당 ID의 버그 리포트 가격을 찾을 수 없습니다.');
    }

    res.status(StatusCodes.OK).json(BugReportPriceRes);
  } catch (error) {
    console.error('Error fetching bug report details:', error);
    return sendError(res, '버그 리포트 가격을 가져오는 중 오류가 발생했습니다.',500);
  }
};