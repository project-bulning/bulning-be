import express from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { getMyInfo } from '@/controllers/user';

const router = express.Router();

router.get('/my-info', authenticateToken, getMyInfo);

export const userRoute = router;
