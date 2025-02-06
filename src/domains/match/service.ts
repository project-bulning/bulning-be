import { User } from '@prisma/client';
import prisma from '@/utils/database';
import { messaging } from '@/utils/firebase';
import {MatchStatusResponseDto} from '@/domains/match/types';
import { checkDuplicateMatch } from '@/utils/duplicate';

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
      hunter: true,
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
    prisma.match.update({
      data: {
        status: accept ? 'MATCH_ACCEPTED' : 'MATCH_REJECTED',
        resolved_at: new Date(),
      },
      where: {
        id: matchId,
      }
    });

  // FCM
  const fcmToken = match?.hunter.fcm_token;

  if (typeof fcmToken !== 'string' || fcmToken.trim() === '') {
    throw new Error("유효하지 않은 FCM token입니다.");
  }

  // 알림 메시지 설정
  const message = {
    token: fcmToken,
    notification: {
      title: accept ? '핼피가 사냥을 수락했어요' : '핼피가 사냥을 거절했어요',
      body: accept ? '1대1로 대화하며 빠르게 도움을 제공하세요' : 'hunter_rejected',
    },
    data: {
      type: accept ? 'hunter_accepted' : 'hunter_rejected',
      hunter: `${match.hunter.id}`,
      helpee: `${match.helper_id}`,
    },
  };

  // 알림 전송
  try {
    const response = await messaging.send(message);
    console.log('FCM 메시지가 성공적으로 전송되었습니다:', response);
  } catch (error) {
    console.error('FCM 메시지 전송 중 오류 발생:', error);
  }
}

//헌터의 지원으로 매치 생성
export const createMatch = async (user: User, reportID: number): Promise<void> => {
  // 중복 체크
  await checkDuplicateMatch(user.id, reportID);

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

  // BugReport의 status를 PENDING으로 업데이트
  await prisma.bugReport.update({
    where: { id: reportID },
    data: {
      status: 'PENDING',
    },
  });
};

export const getMatchStatusService = async (user: User): Promise<MatchStatusResponseDto | null> => {
  // 헬피(PENDING 상태) - 누군가 나타남
  const helperMatch = await prisma.match.findFirst({
    where: {
      helper_id: user.id,
      status: "PENDING",
    },
  });

  if (helperMatch) {
    return {
      role: "helpee",
      status: helperMatch.status,
      matchId: helperMatch.id,
      hunterId: helperMatch.hunter_id,
      type: "hunter_applied"
    };
  }

  // 헌터(MATCH_ACCEPTED 상태) - 핼피가 수락함
  const hunterMatch = await prisma.match.findFirst({
    where: {
      hunter_id: user.id,
      status: "MATCH_ACCEPTED",
    },
  });

  if (hunterMatch) {
    return {
      role: "hunter",
      status: hunterMatch.status,
      matchId:hunterMatch.id,
      helpeeId:hunterMatch.helper_id,
      type: "hunter_accepted"
    };
  }

  return null; // 매칭된 정보가 없음
};