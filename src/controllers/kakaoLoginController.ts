import { Request, Response } from 'express';
import { getKakaoToken, getKakaoUserInfo } from '../services/kakaoLoginService';

// Kakao 로그인 URL 생성 - 사용자가 로그인 버튼을 눌렀을 때 이 URL로 이동시킵니다.
export const kakaoLogin = (req: Request, res: Response): void => {
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.redirect(kakaoLoginUrl);
};

// Kakao Redirect URL - 사용자가 로그인 후 카카오에서 이 URL로 리다이렉트됩니다.
export const kakaoCallback = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.query;
  try {
    const accessToken = await getKakaoToken(code as string);
    const userInfo = await getKakaoUserInfo(accessToken);
    
    // 여기에서 사용자 정보를 데이터베이스에 저장하거나, 사용자 인증 정보를 세션이나 JWT로 관리할 수 있습니다.
    console.log(userInfo);

    // 로그인 성공 후 리다이렉트 또는 사용자 정보를 전달
    res.json({ message: 'Kakao login successful', user: userInfo });
  } catch (error) {
    console.error('Error during Kakao login:', error);
    res.status(500).send('Kakao login failed');
  }
};