import jwt from 'jsonwebtoken';
import { KaKaoUserDTO, RegistrationRequestBody } from '@/dto/userDto';
import { ExtendedJWTPayload } from '@/dto/authDto';
import type { User } from '@prisma/client';
import prisma from '@/utils/database';
import { z } from 'zod';
import {registrationSchema} from '@/validators/userValidator';

// JWT 토큰 생성 함수
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
      location: data.location,
      //terms_accepted: data.termsAccepted ? 1 : 0, // boolean 값을 DB의 Int로 매핑
      nickname: data.nickname,
      updated_at: new Date(),
    },
  });
};

// 회원 정보 수정
export const updateUserInfo = async (user: User, updatedData: Partial<User>): Promise<User> => {

  // 수정할 항목에 대해서만 업데이트
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...updatedData, 
      updated_at: new Date(),
    },
  });

  return updatedUser;
};

//사용자 탈퇴
export const signoutUser = async (user: User): Promise<void> => {
  const userId = user.id;

  // 사용자가 만든 벌레리포트 삭제
  await prisma.bugReport.deleteMany({
    where: { user_id: userId },
  });

  // 사용자의 리뷰 삭제
  await prisma.userReview.deleteMany({
    where: { user_id: userId },
  });

  // 헬퍼/헌터 매치 삭제?
  await prisma.match.deleteMany({
    where: {
      OR: [{ helper_id: userId }, { hunter_id: userId }],
    },
  });

  // 사용자를 DB에서 삭제
  await prisma.user.delete({
    where: { id: userId },
  });
};