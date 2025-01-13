import prisma from '@/utils/database';
import type { User } from '@prisma/client';
import { messaging } from '@/utils/firbase';

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

export const sendAlarmService = async (reportId: number, user: User) => {
  try {
    // BugReport의 status를 'PENDING'으로 업데이트
    await prisma.bugReport.update({
      where: { id: reportId },
      data: { status: "PENDING" },
    });

    // BugReport와 연결된 사용자 정보 가져오기
    const bugReport = await prisma.bugReport.findUnique({
      where: { id: reportId },
      include: { user: true },
    });

    if (!bugReport || !bugReport.user || !bugReport.user.fcm_token) {
      throw new Error("No user or FCM token found for this report");
    }

    const message = {
      notification: {
        title: "헌터의 지원",
        body: `${user.name}님이 사냥을 지원하셨습니다 수락하시겠습니까?`,
      },
      token: bugReport.user.fcm_token,
    };

    // FCM을 통해 알림 전송
    await messaging.send(message);

    console.log(`Notification sent to user with ID: ${user.id}`);
  } catch (error) {
    console.error("Error in sendAlarmService:", error);
    throw new Error("알림 전송 중 오류가 발생했습니다");
  }
};