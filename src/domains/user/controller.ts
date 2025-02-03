import { AuthenticatedRequest } from '@/types/express';
import { sendError } from '@/utils/response';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Match, User } from '@prisma/client';
import { getMatchByUser, createMatch } from '@/domains/match/service';
import { kakaoLogoutService, signoutUser, updateUserInfo } from '@/domains/auth/service';
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

//로그아웃
export const logoutUser = async(req: AuthenticatedRequest, res: Response) => {
  if(! req.user) {
    sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
    return;
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]; 
    if (!accessToken) {
      return sendError(res, '액세스 토큰이 없습니다', StatusCodes.UNAUTHORIZED);
    }
    console.log("사용 중인 액세스 토큰:", accessToken);

    //카카오 로그아웃
    const isKakaoLoggedOut = await kakaoLogoutService(accessToken);
    if (!isKakaoLoggedOut) {
      return sendError(res, '카카오 로그아웃 실패', StatusCodes.UNAUTHORIZED);
    }

    //쿠키 리프레시 토큰 제거
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ message: '로그아웃 성공' });
  } catch (error) {
    sendError(res, '회원 로그아웃 중 오류가 발생했습니다.', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

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
