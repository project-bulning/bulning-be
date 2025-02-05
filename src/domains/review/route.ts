import express from 'express';
import { ReviewController } from '@/domains/review/controller';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.post('/review/:matchId', authenticateToken, ReviewController);

export const route = router;
