import jwt from 'jsonwebtoken';
import { KaKaoUserDTO, RegistrationRequestBody } from '../dto/userDto';
import type { User } from '@prisma/client';
import prisma from '@/utils/database';

// JWT 토큰 생성 함수
export const generateJwtToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
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
      }
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
export const handlUserInfoLogic =  async (data: RegistrationRequestBody, user: User) => {

  // 약관 동의 여부 확인
  if (!data.termsAccepted) {
    throw new Error('서비스 약관에 동의하지 않았습니다.');
  }
  
  return prisma.user.update({
    where: { id: user.id },
    data: {
      phone_number: data.phoneNumber,
      location: data.location,
      gender: data.gender,
      age_group: data.ageRange,
      terms_accepted: data.termsAccepted ? 1 : 0, // boolean 값을 DB의 Int로 매핑
      updated_at: new Date(),
    },
  });
};


