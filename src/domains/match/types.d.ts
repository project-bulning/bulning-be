export type MatchAcceptBody = {
  accept: boolean;
}

export type MatchAcceptParams = {
  matchId: number;
}

export interface MatchStatusResponseDto {
  //role?: "helpee" | "hunter" ;
  match: boolean;
  matchId: number;
  hunterId: number;
}