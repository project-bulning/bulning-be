import express from 'express';
import { hunterReviewController } from '@/controllers/userReviewController';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.post('/review/:matchId', authenticateToken, hunterReviewController);

export const userReviewRoute = router;