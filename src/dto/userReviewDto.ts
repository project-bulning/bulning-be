import { UserReview } from '@prisma/client';

export interface UserReviewResponse {
    score: number;
    review_note: string;
    created_at: Date;
}

export type CreateUserReviewRequestBody = Pick<UserReview, 'score' | 'time_taken' | 'price' | 'review_note'>