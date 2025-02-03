import {GetBugReportPriceResponse} from '@/domains/hunting/types';
import prisma from '@/utils/database';
import Socket from '@/domains/chat/socket/session/Session';
import { User } from '@prisma/client';
import { messaging } from '@/utils/firebase';

// 공통 로직: matchId로 BugReport 조회
const getMatchAndBugReport = async (matchId: number) => {
  // matchId로 연결된 BugReport 조회
  const bugReport_matchId = await prisma.bugReport.findFirst({
    where: {
      matches: {
        some: { id: matchId }
      }
    }
  });

  if (!bugReport_matchId) {
    throw new Error('해당 matchId에 대한 Match 또는 BugReport를 찾을 수 없습니다.');
  }
  return bugReport_matchId;
}

export const tradeAlarmService = async (matchId: number, user: User) => {
  try {
    // matchId를 이용하여 Match 테이블에서 매칭 정보 조회
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        helper: true,
        hunter: true,
      },
    });

    if (!match) {
      throw new Error("해당 Match를 찾을 수 없습니다.");
    }

    let fcmToken: string | null = null;

    // User가 hunter이면 helper에게 알림 전송
    if (user.id === match.hunter_id) {
      fcmToken = match.helper.fcm_token;
    }
    // User가 helper이면 hunter에게 알림 전송
    else if (user.id === match.helper_id) {
      fcmToken = match.hunter.fcm_token;
    } else {
      throw new Error("유효하지 않은 사용자입니다.");
    }

    // FCM 토큰 유효성 체크
    if (typeof fcmToken !== 'string' || fcmToken.trim() === '') {
      throw new Error("유효하지 않은 FCM token입니다.");
    }

    const message = {
      token: fcmToken,
      data:{
        type: "trade_completed", 
        matchId: `${matchId}`
      },
    };

    // FCM을 통해 알림 전송
    await messaging.send(message);

    console.log(`Notification sent to user with ID: ${user.id}`);
  } catch (error) {
    console.error("Error in sendAlarmService:", error);
    throw new Error("알림 전송 중 오류가 발생했습니다");
  }
};
  
//거래 종료, 거래 취소
export const setBugReportStatus = async (matchId: number, trade: boolean, user: User) => {
  try {
    const bugReport = await getMatchAndBugReport(matchId);

    let bugReportUpdated = false;
    let matchUpdated = false;
    let chatClosed = false;

    // trade에 따라 BugReport 상태 업데이트
    const updatedBugReport = await prisma.bugReport.update({
      where: { id: bugReport.id },
      data: { status: trade ? 'COMPLETED' : 'WAITING_MATCH' }, 
    });

    if (updatedBugReport) {
      bugReportUpdated = true;
    }

    // Match 상태 업데이트
    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: { status: 'MATCH_CLOSED', resolved_at: new Date() }, 
    });

    if (updatedMatch) {
      matchUpdated = true;
    }

    // 채팅 강제 종료
    chatClosed = Socket.closeSession(user.id);

    return { bugReportUpdated, matchUpdated, chatClosed };
  } catch (error) {
    console.error("Error in setBugReportStatus:", error);
    return { bugReportUpdated: false, matchUpdated: false, chatClosed: false };
  }
};

  
  
// 게시물 가격 조회 로직
export const BugReportPrice = async (matchId: number): Promise<GetBugReportPriceResponse | null> => {
    try {
        const bugReport = await getMatchAndBugReport(matchId);
        return {
          price: bugReport.price
        };
      } catch (error) {
        console.error("Error in BugReportPrice:", error);
        throw new Error("BugReport 가격 조회 중 오류가 발생했습니다.");
      }
};