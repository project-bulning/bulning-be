import {GetBugReportPriceResponse} from '@/domains/hunting/types';
import prisma from '@/utils/database';

// 공통 로직: matchId로 BugReport 조회
const getMatchAndBugReport = async (matchId: number) => {
    // Match 테이블에서 matchId로 해당 Match와 BugReport 조회
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { bug_report: true },
    });
  
    if (!match || !match.bug_report) {
      throw new Error('해당 matchId에 대한 Match 또는 BugReport를 찾을 수 없습니다.');
    }
  
    return { bugReport: match.bug_report };
}
  
//거래 종료, 거래 취소
export const setBugReportStatus = async (matchId: number, trade: boolean) => {
    try {
        const { bugReport } = await getMatchAndBugReport(matchId);
  
      // trade에 따라 BugReport와 Match 상태 업데이트
      if (trade) {
        // trade가 true (거래 종료)
        await prisma.bugReport.update({
          where: { id: bugReport.id },
          data: { status: 'COMPLETED' }, 
        });
  
        await prisma.match.update({
          where: { id: matchId },
          data: { status: 'MATCH_CLOSED', resolved_at: new Date() }, 
        });

        //채팅 강제 종료?

      } else {
        // trade가 false(거래 취소)
        await prisma.bugReport.update({
          where: { id: bugReport.id },
          data: { status: 'WAITING_MATCH' }, 
        });
  
        await prisma.match.update({
          where: { id: matchId },
          data: { status: 'MATCH_REJECTED', resolved_at: new Date() },
        });
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
        const { bugReport } = await getMatchAndBugReport(matchId);
    
        // 반환할 객체
        return {
          price: bugReport.price
        };
      } catch (error) {
        console.error("Error in BugReportPrice:", error);
        throw new Error("BugReport 가격 조회 중 오류가 발생했습니다.");
      }
};