import { UserReviewResponse } from '@/domains/review/types';

export interface KaKaoUserDTO {
  id: number;
  nickname: string;
}

export interface RegistrationRequestBody {
  name: string,
  nickname: string;
  location: string;
}

export interface HunterInfoResponse {
  name: string;
  location: string;
  location_detail: string;
  gender: string;
  age_group: string;
  avg_score: number;
  trade_count: number;
  user_reviews: UserReviewResponse[];
  pr_memo: string;
  match_id:number;
}
