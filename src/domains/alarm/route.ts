import express from 'express';
import { registerTokenController, sendAlarmController, hunterInfoController } from '@/domains/alarm/controller';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.post('/alarm/fcm-token', authenticateToken, registerTokenController);
router.post('/alarm/request/:reportId', authenticateToken, sendAlarmController);
router.get('/alarm/hunter-info/:hunterId', authenticateToken, hunterInfoController);

export const alarmRoute = router;
