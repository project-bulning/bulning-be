import {GetBugReportPriceResponse} from '@/domains/hunting/types';
import prisma from '@/utils/database';
import Socket from '@/domains/chat/socket/session/Session';
import { User } from '@prisma/client';

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