import { User } from '@prisma/client';
import prisma from '@/utils/database';

export const getMatchByUser = (user: User) => {
  return prisma.match.findFirst({
    where: {
      status: 'MATCH_ACCEPTED',
      OR: [
        { helper: user },
        { hunter: user },
      ],
    }
  });
}

export const setMatchStatus = async (matchId: number, accept: boolean) => {
  // accept가 false일 때 bugReport status를 WAITING_MATCH로 바꾸기
  const match = await prisma.match.findUnique({
    where: {
      id: matchId,
    },
    include: {
      bug_report: true,
    },
  });

  if (!match) {
    throw new Error("해당 Match를 찾을 수 없습니다.");
  }

  if (!accept && match.bug_report) {
    await prisma.bugReport.update({
      data: {
        status: 'WAITING_MATCH',
      },
      where: {
        id: match.bug_report.id,
      },
    });
  }

  //accept에 따라 Match status를 바꾸기
  return prisma.match.update({
    data: {
      status: accept ? 'MATCH_ACCEPTED' : 'MATCH_REJECTED',
      resolved_at: new Date(),
    },
    where: {
      id: matchId,
    }
  });
}

//헌터의 지원으로 매치 생성
export const createMatch = async (user: User, reportID: number): Promise<void> => {

  const bugReport = await prisma.bugReport.findUnique({
    where: { id: reportID },
    select: { user_id: true },
  });

  if (!bugReport) {
    throw new Error('BugReport를 찾을 수 없습니다.');
  }

  // Match 테이블에 새로운 레코드 생성
  await prisma.match.create({
    data: {
      bug_report_id: reportID,
      helper_id: bugReport.user_id,
      hunter_id: user.id, 
      status: 'PENDING', 
    },
    include: {
      helper: true,
      hunter: true, 
    },
  });  
};
