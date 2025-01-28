import axios from 'axios';
import { ExtendedJWTPayload } from '@/domains/auth/types';
import jwt from 'jsonwebtoken';
import { KaKaoUserDTO, RegistrationRequestBody } from '@/domains/user/types';
import prisma from '@/utils/database';
import type { User } from '@prisma/client';
import { registrationSchema } from '@/domains/user/validator';
import { z } from 'zod';

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

export const generateJwtToken = (id: number, kakaoId: string): string => {
  const payload: ExtendedJWTPayload = {
    id, kakao_id: kakaoId
  };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

// 사용자 로그인 처리 - 데이터베이스에 사용자 추가 및 토큰 생성
export const handleUserLogin = async (user: KaKaoUserDTO) => {
  try {
    // 데이터베이스에 사용자 존재 여부 확인
    let existingUser = await prisma.user.findFirst({
      where: {
        kakao_id: user.id.toString(),
      },
    });

    // 사용자가 없으면 새로 추가 필요
    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          kakao_id: user.id.toString(),
          name: user.nickname,
        },
      });
    }

    return existingUser;
  } catch (error) {
    console.error('Failed to handle user login:', error);
    throw new Error('Failed to handle user login');
  }
};


//회원 가입 -> 사용자 정보 추가 로직
export const handleUserInfoInput =  async (data: RegistrationRequestBody, user: User) => {

  // 데이터 검증
  try {
    registrationSchema.parse(data); // 스키마에 따라 데이터 검증
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation Error: ${error.errors.map((e) => e.message).join(', ')}`);
    }
    throw error;
  }

  return prisma.user.update({
    where: { id: user.id },
    data: {
      name:data.name,
      location: data.location,
      nickname: data.nickname,
      updated_at: new Date(),
    },
  });
};

// 회원 정보 수정
export const updateUserInfo = (user: User, updatedData: Partial<User>): Promise<User> => {

  // 수정할 항목에 대해서만 업데이트
  return prisma.user.update({
    where: {id: user.id},
    data: {
      ...updatedData,
      updated_at: new Date(),
    },
  });
};

//사용자 탈퇴
export const signoutUser = async (user: User): Promise<void> => {
  const userId = user.id;

  // 헬퍼/헌터 매치 상태 확인
  try {
    const activeMatches = await prisma.match.findMany({
      where: {
        OR: [{ helper_id: userId }, { hunter_id: userId }],
        NOT: { status: 'MATCH_CLOSED' },
      },
    });

    if (activeMatches.length > 0) {
      const error = new Error('매칭중인 상태가 있어 탈퇴할 수 없습니다.');
      (error as any).statusCode = 400;
      throw error;
    }
    await prisma.match.deleteMany({
      where: {
        OR: [{ helper_id: userId }, { hunter_id: userId }],
      },
    });
    await prisma.bugReport.deleteMany({ where: { user_id: userId } });
    await prisma.userReview.deleteMany({ where: { user_id: userId } });
    await prisma.user.delete({ where: { id: userId } });
  } catch (error) {
    console.error('Error during user sign out:', error);
    throw error;
  }
};

