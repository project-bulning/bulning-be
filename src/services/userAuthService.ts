import jwt from 'jsonwebtoken';
import { KaKaoUserDTO, RegistrationRequestBody } from '@/dto/userDto';
import { PrismaClient } from '@prisma/client';
import type { Response } from 'express';
import type { AuthenticatedRequest } from '@/types/express';

const prisma = new PrismaClient();

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
export const handlUserInfoLogic =  async (
  req: AuthenticatedRequest,
  res: Response
) => {
    // const {  gender, ageRange, phoneNumber, location, termsAccepted } = req.body;

    // //약관 동의 필드 필수 true
    // if (!termsAccepted) {
    //   return {
    //     status: 400,
    //     data: { message: 'Terms must be accepted to register' },
    //   };
    // }

    //userId를 조회해서 db에 접근한 후 req.body에 있는 정보 db에 추가 저장하는 코드
    // try {
    //   await prisma.user.update({
    //     where: { id: parseInt(req.userId) },
    //     data: {
    //       gender,
    //       age_group: ageRange,
    //       phone_number: phoneNumber,
    //       location,
    //       terms_accepted: termsAccepted ? 1 : 0,
    //       updated_at: new Date(),
    //     },
    //   });

    //   res.status(200).json({ message: 'User registration details updated successfully' });
    // } catch (error) {
    //   console.error('Failed to update user registration details:', error);
    //   res.status(500).json({ message: 'Failed to update user registration details' });
    // }

};


