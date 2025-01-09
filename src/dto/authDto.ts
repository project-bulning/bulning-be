import { JwtPayload } from 'jsonwebtoken';

export interface ExtendedJWTPayload extends JwtPayload {
  id: number;
  kakao_id: string;
}
