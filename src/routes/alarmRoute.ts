import express from 'express';
import { registerTokenController, sendAlarmController } from '@/controllers/alarmController';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.post('/alarm/fcm-token', authenticateToken, registerTokenController);
router.post('/alarm/request/:reportId', authenticateToken, sendAlarmController);

export const alarmRoute = router;