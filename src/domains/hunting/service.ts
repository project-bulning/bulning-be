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
export const setBugReportStatus = async (matchId: number, trade: boolean, user:User) => {
    try {
      const bugReport  = await getMatchAndBugReport(matchId);
  
      // trade에 따라 BugReport 상태 업데이트
      if (trade) {
        // trade가 true (거래 종료)
        await prisma.bugReport.update({
          where: { id: bugReport.id },
          data: { status: 'COMPLETED' }, 
        });

      } else {
        // trade가 false(거래 취소)
        await prisma.bugReport.update({
          where: { id: bugReport.id },
          data: { status: 'WAITING_MATCH' }, 
        });
      }

      //Match 상태 업데이트
      await prisma.match.update({
        where: { id: matchId },
        data: { status: 'MATCH_CLOSED', resolved_at: new Date() }, 
      });

      // 채팅 강제 종료
      const isClosed = Socket.closeSession(user.id);

      if (isClosed) {
        console.log(`채팅 세션 종료 완료: 사용자 ${user.id}`);
      } else {
        console.log(`채팅 세션 종료 실패: 사용자 ${user.id}`);
        throw new Error("채팅 세션 종료 중 오류가 발생했습니다.");
      }
  
      console.log(`BugReport와 Match의 status가 성공적으로 업데이트 : ${matchId}`);
    } catch (error) {
      console.error("Error in setBugReportStatus:", error);
      throw new Error("BugReport 및 Match 상태 업데이트 중 오류가 발생했습니다.");
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