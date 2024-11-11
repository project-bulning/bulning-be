import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { KaKaoUserDTO } from '../dto/userDto';

const prisma = new PrismaClient();

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

// 사용자 로그인 처리 - 데이터베이스에 사용자 추가 및 토큰 생성
export const handleUserLogin = async (user: KaKaoUserDTO): Promise<string> => {
  try {
    // 데이터베이스에 사용자 존재 여부 확인
    let existingUser = await prisma.users.findUnique({
      where: { id: user.id },
    });

    // 사용자가 없으면 새로 추가
    if (!existingUser) {
      existingUser = await prisma.users.create({
        data: {
          id: user.id,
          name: user.nickname,
          created_at: new Date(user.connectedAt),
        },
      });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return token;
  } catch (error) {
    throw new Error('Failed to handle user login');
  }
};