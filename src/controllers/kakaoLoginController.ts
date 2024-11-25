import { Request, Response } from 'express';
import { getKakaoToken, getKakaoUserInfo } from '../services/kakaoLoginService';
import { handleUserLogin, handleRegistrationLogic } from '../services/userAuthService';

// Kakao 로그인 URL 생성 - 사용자가 로그인 버튼을 눌렀을 때 이 URL로 이동시킵니다.
export const kakaoLogin = (req: Request, res: Response): void => {
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.redirect(kakaoLoginUrl);
};

// Kakao Redirect URL - 사용자가 로그인 후 카카오에서 이 URL로 리다이렉트됩니다.
export const kakaoCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  try {
    const accessToken = await getKakaoToken(code as string);
    const userInfo = await getKakaoUserInfo(accessToken);

    //res.status(200).json({
    //  userId: userInfo.id,
    //});

    //사용자 로그인 처리 또는 신규 사용자 등록 요청
    const existingUser = await handleUserLogin(userInfo);
    if (existingUser.isNewUser) {
      res.status(200).json({
        message: 'New user detected. Please complete registration.',
        isNewUser: true,
        userId: userInfo.id,
      });
    } else {
      res.status(200).json({
        message: 'Kakao login successful',
        token: existingUser.token,
        isNewUser: false,
      });
    }
  } catch (error) {
    console.error('Error during Kakao login:', error);
    res.status(500).send('Kakao login failed');
  }
};

// 회원가입 절차 진행 - 추가 정보 수집 후 등록
// export const registration = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = await handleRegistrationLogic(req);
//     res.status(result.status).json(result.data);
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).send('Registration failed');
//   }
// };