import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '@/types/express';
import prisma from '@/utils/database';
import { User } from '@prisma/client';
import { sendError } from '@/utils/response';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { verifyJWT } from '@/utils/auth';

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    sendError(res, ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    sendError(res, ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    return;
  }

  try {
    const decoded = verifyJWT(token);

    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    }) as User;
    next();
  } catch (error) {
    console.error('Token verification failed: ', error);
    sendError(res, '토큰 검증에 실패했습니다.', StatusCodes.UNAUTHORIZED);
    return;
  }
};
