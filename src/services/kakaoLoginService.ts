import axios from 'axios';

// 카카오 서버에 액세스 토큰 요청
export const getKakaoToken = async (code: string): Promise<string> => {
  try {
    const tokenResponse = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return tokenResponse.data.access_token;
  } catch (error) {
    throw new Error('Failed to get Kakao token');
  }
};

// 액세스 토큰을 사용하여 사용자 정보 요청
export const getKakaoUserInfo = async (accessToken: string): Promise<any> => {
    try {
      const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return userInfoResponse.data;
    } catch (error) {
      throw new Error('Failed to get Kakao user info');
    }
};