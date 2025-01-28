import { CreateUserReviewRequestBody } from '@/domains/review/types';
import prisma from '@/utils/database';

export const createHunterReview = async (
  matchId: number, data: CreateUserReviewRequestBody) => {

  const match = await prisma.match.findUnique({
    where: {id: matchId},
    include: {hunter: true},
  });

  if (!match || !match.hunter) {
    throw new Error('해당 ID의 매칭 정보를 찾을 수 없습니다.');
  }

  return prisma.userReview.create({
    data: {
      user_id: match.hunter.id,
      score: data.score,
      merit: data.merit || [],
      review_note: data.review_note,
    },
  });
};
