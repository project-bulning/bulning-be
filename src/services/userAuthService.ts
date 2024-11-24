import jwt from 'jsonwebtoken';
import { KaKaoUserDTO } from '../dto/userDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// JWT 토큰 생성 함수 (반복 제거)
const generateJwtToken = (userId: number): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
};

//회원 가입 로직
export const handleRegistrationLogic = async (req: Request): Promise<{ status: number; data: any }> => {
    const { userId, gender, ageRange, phoneNumber, location, termsAccepted } = req.body;
  
    if (!termsAccepted) {
      return {
        status: 400,
        data: { message: 'Terms must be accepted to register' },
      };
    }
  
    // 새로운 사용자 등록
    const newUser = await prisma.users.create({
      data: {
        kakaoId: userId,
        gender,
        ageGroup: ageRange,
        phone_number: phoneNumber,
        location,
        terms_accepted: termsAccepted ? 1 : 0,
        created_at: new Date(),
      },
    });
  
    // JWT 토큰 생성 후 응답
    const jwtToken = generateJwtToken(newUser.id);
    return {
      status: 200,
      data: {
        message: 'Registration successful',
        token: jwtToken,
      },
    };
};
  
// 사용자 로그인 처리 - 데이터베이스에 사용자 추가 및 토큰 생성
export const handleUserLogin = async (user: KaKaoUserDTO): Promise<{ isNewUser: boolean; token?: string }> => {
    try {
      // 데이터베이스에 사용자 존재 여부 확인
      let existingUser = await prisma.users.findUnique({
        where: { kakaoId: user.id },
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
  