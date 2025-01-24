import { UserReviewResponse } from '@/dto/userReviewDto';

export interface KaKaoUserDTO {
    id: number;
    nickname: string;
}

export interface RegistrationRequestBody {
    name: string,
    nickname: string;
    location: string;
    //termsAccepted: boolean;
}


export interface HunterInfoResponse {
    name: string;
    location: string;
    gender: string;
    age_group: string;
    avg_score: number;
    user_reviews_count: number;
    user_reviews: UserReviewResponse[];
    pr_memo: string;
}
