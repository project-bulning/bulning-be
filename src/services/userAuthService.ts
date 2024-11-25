import jwt from 'jsonwebtoken';
import { KaKaoUserDTO, RegistrationRequestBody } from '../dto/userDto';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// JWT 토큰 생성 함수
const generateJwtToken = (userId: number): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
};

//회원 가입 로직
export const handleRegistrationLogic = async (
  req: Request<{}, {}, RegistrationRequestBody>, res: Response
) => {
    const { userId, gender, ageRange, phoneNumber, location, termsAccepted } = req.body;
  
    // //약관 동의 필드 필수 true
    // if (!termsAccepted) {
    //   return {
    //     status: 400,
    //     data: { message: 'Terms must be accepted to register' },
    //   };
    // }

    // `userId`를 숫자로 변환
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      return {
        status: 400,
        data: { message: 'Invalid userId provided' },
      };
    }
  
    // 새로운 사용자 등록
    const newUser = await prisma.users.create({
      data: {
        id: userIdNumber,
        gender,
        age_group: ageRange,
        phone_number: phoneNumber,
        location,
        terms_accepted: termsAccepted ? 1 : 0,
        created_at: new Date(),
      },
    });
  
    // JWT 토큰 생성 후 응답
    const jwtToken = generateJwtToken(newUser.id);
    const redirectUrl = `${process.env.REDIRECT_URL}/auth/login?access_token=${jwtToken}`;
    res.redirect(redirectUrl as string);
};
  
// 사용자 로그인 처리 - 데이터베이스에 사용자 추가 및 토큰 생성
export const handleUserLogin = async (user: KaKaoUserDTO): Promise<{ isNewUser: boolean; token?: string }> => {
    try {
      // 데이터베이스에 사용자 존재 여부 확인
      let existingUser = await prisma.users.findUnique({
        where: { id: user.id },
      });
  
      // 사용자가 없으면 새로 추가 필요
      if (!existingUser) {
        return { isNewUser: true };
      }
  
      // JWT 토큰 생성
      const token = generateJwtToken(existingUser.id);
      return { isNewUser: false, token };
    } catch (error) {
      throw new Error('Failed to handle user login');
    }
};
  