import prisma from '@/utils/database';
import type { User } from '@prisma/client';
import { messaging } from '@/utils/firebase';
import { HunterInfoResponse } from '@/domains/user/types';
import { UserReviewResponse } from '@/domains/review/types';

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
      token: bugReport.user.fcm_token,
      notification: {
        title: "벌레를 잡아줄 사람이 나타났어요!",
        body: `우리 동네 헌터의 정보를 빠르게 확인해 보세요`,
      },
      data:{user: `${user.id}`},
    };

    // FCM을 통해 알림 전송
    await messaging.send(message);

    console.log(`Notification sent to user with ID: ${user.id}`);
  } catch (error) {
    console.error("Error in sendAlarmService:", error);
    throw new Error("알림 전송 중 오류가 발생했습니다");
  }
};

//헌터 정보 보내기
export const hunterInfoService =  async (hunterId: number,  user: User): Promise<HunterInfoResponse | null> => {

  //ID로 헌터 찾기기
  const hunter = await prisma.user.findUnique({
    where: { id: hunterId },
    include: {
      user_reviews: true,
    },
  });

  if (!hunter) {
    throw new Error("해당 ID의 헌터 정보를 찾을 수 없습니다.");
  }

  //리뷰, 평균평점 계산
  const userReviews = hunter.user_reviews;
  const avgScore = userReviews.length > 0
  ? parseFloat((userReviews.reduce((sum, review) => sum + (review.score || 0), 0) / userReviews.length).toFixed(1))
  : 0;


  //반환할 리뷰 리스트
  const userReviewsResponse: UserReviewResponse[] = userReviews.map((review) => ({
    score: review.score || 0,
    review_note: review.review_note || '',
    merit: Array.isArray(review.merit)
    ? review.merit.map((item) => String(item)) : [String(review.merit)],
    created_at: review.created_at || new Date(),
  }));

  // Match 테이블에서 헌터와 연결된 PENDING 상태의 Match ID 찾기
  const match = await prisma.match.findFirst({
    where: {
      helper_id: user.id,
      hunter_id: hunterId,
      status: 'PENDING',
    },
    select: {
      id: true,
    },
  });

  const matchId = match ? match.id : 0;


  //응답
  return {
    name: hunter.name || '',
    location: hunter.location || '',
    location_detail: hunter.location_detail || '',
    gender: hunter.gender || '',
    age_group: hunter.age_group || '',
    avg_score: avgScore,
    trade_count: userReviews.length,
    user_reviews: userReviewsResponse,
    pr_memo: hunter.pr_memo || '',
    match_id : matchId
  };
}
