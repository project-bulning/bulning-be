import { CreateUserReviewRequestBody } from '@/domains/review/types';
import prisma from '@/utils/database';
import { User } from '@prisma/client';

export const createReview = async (
  matchId: number, 
  data: CreateUserReviewRequestBody,
  user:User
) => {

  const match = await prisma.match.findUnique({
    where: {id: matchId},
    include: { hunter: true, helper: true },
  });

  if (!match) {
    throw new Error('해당 ID의 매칭 정보를 찾을 수 없습니다.');
  }

  let role: 'HELPEE' | 'HUNTER' ;
  let userId: number;

  if (user.id === match.hunter.id) {
    role = 'HELPEE';
    userId = match.helper.id;
  } else {
    role = 'HUNTER'; 
    userId = match.hunter.id;
  }

  return prisma.userReview.create({
    data: {
      user_id: userId,
      score: data.score,
      merit: data.merit || [],
      review_note: data.review_note,
      role: role,
    },
  });
};
