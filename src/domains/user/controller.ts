import { AuthenticatedRequest } from '@/types/express';
import { sendError } from '@/utils/response';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Match, User } from '@prisma/client';
import { getMatchByUser, createMatch } from '@/domains/match/service';
import { signoutUser, updateUserInfo } from '@/domains/auth/service';
//회원 정보 조회
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

// 회원 정보 수정
export const updateUser = async (
  req: AuthenticatedRequest<{},{},{reportId:string}>,
  res: Response
) => {
  if(! req.user) {
    sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
    return;
  }
  const updatedData = req.body;
  const reportID = req.query.reportId ? req.query.reportId : null;

  if (reportID) {
    if (isNaN(Number(reportID))) {
      return sendError(res, 'reportId는 숫자여야 합니다.');
    }
    try{
      await createMatch(req.user, Number(reportID));
    }catch (error) {
      sendError(res, '매칭 중 오류가 발생했습니다다', 500);
    }
  }

  try {
    const updatedUser = await updateUserInfo(req.user, updatedData);

    res.json({
      message: '회원 정보가 성공적으로 수정되었습니다.',
      user: updatedUser,
    });
  } catch (error) {
    sendError(res, '회원 정보 수정 중 오류가 발생했습니다.', 500);
  }
};

//탈퇴
export const signoutMyInfo = async(req: AuthenticatedRequest, res: Response) => {
  if(! req.user) {
    sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
    return;
  }

  try {
    await signoutUser(req.user);
    res.json({ message: '회원 탈퇴가 완료되었습니다.' });
  } catch (error) {
    if ((error as any).statusCode === 400) {
      // 매칭중인 상태로 탈퇴할 수 없는 경우
      sendError(res, (error as Error).message, StatusCodes.BAD_REQUEST);
    } else {
      sendError(res, '회원 탈퇴 처리 중 오류가 발생했습니다.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
