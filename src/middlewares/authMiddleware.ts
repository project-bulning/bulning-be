import type { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { AuthenticatedRequest } from '@/types/express';
import prisma from '@/utils/database';
import { User } from '@prisma/client';
import { sendError } from '@/utils/response';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

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

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;

    if (typeof decoded !== 'object' || !decoded.userId) {
      res.status(401).json({message: 'Invalid token payload'});
      return;
    }

    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    }) as User;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({message: 'Invalid or expired token'});
    return;
  }
};
