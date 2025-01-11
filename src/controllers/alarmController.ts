import { Request, Response } from 'express';
import { sendError } from '@/utils/response';
import { AuthenticatedRequest } from '@/types/express';
import { StatusCodes } from 'http-status-codes';
import { registerTokenService } from '@/services/alarmService';


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