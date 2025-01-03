import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/types/express';
import {RegistrationRequestBody} from '@/dto/userDto';
import { sendError } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { getKakaoToken, getKakaoUserInfo } from '../services/kakaoLoginService';
import { handleUserLogin, generateJwtToken, handlUserInfoLogic } from '../services/userAuthService';

// Kakao 로그인 URL 생성 - 사용자가 로그인 버튼을 눌렀을 때 이 URL로 이동시킵니다.
export const kakaoLogin = (req: Request, res: Response): void => {
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.redirect(kakaoLoginUrl);
};

// Kakao Redirect URL - 사용자가 로그인 후 카카오에서 이 URL로 리다이렉트됩니다.
// db 저장, 토큰 생성
export const kakaoCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  try {
    const accessToken = await getKakaoToken(code as string);
    const userInfo = await getKakaoUserInfo(accessToken);
    const { id, properties: { nickname } } = userInfo;

    // id 조회 시 만약 db에서 새로운 사용자일 경우 새롭게 저장
    await handleUserLogin({ id, nickname });
  
    // JWT 토큰 생성 후 응답
    const jwtToken = generateJwtToken(id);
    const redirectUrl = `${process.env.REDIRECT_URL}/auth/login?access_token=${jwtToken}`;
    res.redirect(redirectUrl as string);
    
  } catch (error) {
    console.error('Error during Kakao login:', error);
    res.status(500).send('Kakao login failed');
  }
};

//회원가입 ,회원 정보 입력
export const userInfo = async (
  req: AuthenticatedRequest<{}, RegistrationRequestBody>,
  res: Response
) => {
  if(! req.user) {
      return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }
  try {
    await handlUserInfoLogic(req.body, req.user);
    res.status(StatusCodes.CREATED);
  } catch (error) {
    console.error('Error during user information update:', error);
    res.status(500).json({ message: 'Registration failed due to an internal error' });
  }
};