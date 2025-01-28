import express from 'express';
import { hunterReviewController } from '@/domains/review/controller';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.post('/review/:matchId', authenticateToken, hunterReviewController);

export const route = router;
