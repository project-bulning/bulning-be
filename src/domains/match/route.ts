import express from 'express';
import { modifyMatch } from '@/domains/match/controller';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.put('/matches/:matchId', authenticateToken, modifyMatch);

export const matchRoute = router;
