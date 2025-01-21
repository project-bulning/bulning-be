import { User } from '@prisma/client';
import prisma from '@/utils/database';

export const getMatchByUser = (user: User) => {
  return prisma.match.findFirst({
    where: {
      status: 'MATCH_ACCEPTED',
      OR: [
        { helper: user },
        { hunter: user },
      ],
    }
  });
}

export const setMatchStatus = (matchId: number, accept: boolean) => {
  return prisma.match.update({
    data: {
      status: accept ? 'MATCH_ACCEPTED' : 'MATCH_REJECTED',
      resolved_at: new Date(),
    },
    where: {
      id: matchId,
    }
  });
}
