import type { User } from '@prisma/client';
import { CreateUserReviewRequestBody } from '@/dto/userReviewDto';
import prisma from '@/utils/database';

export const createHunterReview = async (matchId: number, data: CreateUserReviewRequestBody, user: User) => {

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { hunter: true },
    });
  
    if (!match || !match.hunter) {
        throw new Error("해당 ID의 매칭 정보를 찾을 수 없습니다.");
    }

    const review = await prisma.userReview.create({
      data: {
        user_id: match.hunter.id,
        score: data.score,
        merit: data.merit || [],
        review_note: data.review_note,
      },
    });
  
    return review;
  };