import { Request, Response } from 'express';
import { sendError } from '@/utils/response';
import { AuthenticatedRequest } from '@/types/express';
import { StatusCodes } from 'http-status-codes';
import { hunterInfoService, registerTokenService, sendAlarmService } from '@/services/alarmService';
import { HunterInfoResponse } from '@/dto/userDto';


export const registerTokenController = async (
  req: AuthenticatedRequest<{},{fcmToken : string}>, 
  res: Response
) => {
    if(! req.user) {
        return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
    }

    const { fcmToken } = req.body

    try {
        await registerTokenService(fcmToken, req.user);
        res.status(StatusCodes.CREATED).json({
            message: '사용자 FCM 토큰이 성공적으로 저장되었습니다.',
          });
      } catch(e) {
        console.error(e);
        return sendError(res, '게시글 업로드에 실패했습니다.');
    }
};

export const sendAlarmController = async (
  req: AuthenticatedRequest<{reportId:string},{}>, 
  res: Response
) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
}
  const reportId = req.params;

  if (!reportId || isNaN(Number(reportId))){
    return sendError(res, '유효한 report ID가 필요합니다.');
  }

  try {
    await sendAlarmService(Number(reportId),req.user);
    res.status(200).json({ message: "핼피에게 알림이 전송되었습니다다" });
  } catch (error) {
    return sendError(res, '알람 전송 중 오류가 발생했습니다.',500); 
  }
};

export const hunterInfoController = async(
  req: AuthenticatedRequest<{hunterId:string},{}>, 
  res: Response<HunterInfoResponse>
) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }
  const {hunterId} = req.params;
  if (!hunterId || isNaN(Number(hunterId))){
    return sendError(res, '유효한 hunter ID가 필요합니다.');
  }

  const hunterInfo = await hunterInfoService(Number(hunterId));
  if (!hunterInfo) {
    return sendError(res, '해당 ID의 헌터 정보를 찾을 수 없습니다.');
  }
  res.status(StatusCodes.OK).json(hunterInfo);

}
