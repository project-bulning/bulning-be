import express from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import {
    modifyBugReportStatus,
    getBugReportPrice,
    tradeAlarm
} from '@/domains/hunting/controller';

const router = express.Router();

router.put('/hunting/:matchId', authenticateToken, modifyBugReportStatus);
router.post('/hunting/trade/:matchId', authenticateToken, tradeAlarm);
router.get('/hunting/:matchId/price', authenticateToken, getBugReportPrice);

export const huntingRoute = router;
