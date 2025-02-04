export type MatchAcceptBody = {
  accept: boolean;
}

export type MatchAcceptParams = {
  matchId: number;
}

export interface MatchStatusResponseDto {
  role: "helpee" | "hunter" ;
  status: MatchStatus;
  matchId: number;
  hunterId?: number;
  helpeeId?: number;
}