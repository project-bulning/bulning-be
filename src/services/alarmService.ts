import prisma from '@/utils/database';
import type { User } from '@prisma/client';

export const registerTokenService = async (fcmToken: string, user: User) => {
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { fcm_token: fcmToken},
      });
    } catch (error) {
      console.error("Error in registerTokenService:", error);
      throw new Error("FCM 토큰 저장 시 오류가 발생했습니다");
    }
  };