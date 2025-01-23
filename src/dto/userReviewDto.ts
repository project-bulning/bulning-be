import { UserReview } from '@prisma/client';

export interface UserReviewResponse {
    score: number;
    review_note: string;
    merit: string[],
    created_at: Date;
}

export type CreateUserReviewRequestBody = Pick<UserReview, 'score' | 'review_note'> & { merit: string[]};