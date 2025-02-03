import express from 'express';
import { modifyMatch, getMatchStatus } from '@/domains/match/controller';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.put('/matches/:matchId', authenticateToken, modifyMatch);
router.get('/user/match/status', authenticateToken, getMatchStatus);

export const matchRoute = router;
