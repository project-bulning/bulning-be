import jwt from 'jsonwebtoken';
import { ExtendedJWTPayload } from '@/domains/auth/types';
import type { TokenType } from '@/types/auth';

export const verifyJWT = (
  token: string, tokenType: TokenType = 'access', ignoreExpiration: boolean = false) => {
  const SECRET = getJWTSecret(tokenType);
  if (!SECRET) {
    throw new Error('토큰 시크릿 값이 정의되지 않았습니다.');
  }
  const decoded = jwt.verify(token, SECRET, {
    ignoreExpiration
  }) as ExtendedJWTPayload;
  if(typeof decoded !== 'object' || !decoded.id) {
    throw new Error('토큰 구조가 올바르지 않습니다.');
  }
  return decoded;
};

export const getJWTSecret = (tokenType: TokenType = 'access') => {
  return tokenType === 'access' ?
    process.env.ACCESS_SECRET :
    process.env.REFRESH_SECRET;
}
