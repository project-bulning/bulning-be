import express from 'express';
import { registerTokenController } from '@/controllers/alarmController';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.post('/alarm/fcm-token', authenticateToken, registerTokenController);

export const alarmRoute = router;