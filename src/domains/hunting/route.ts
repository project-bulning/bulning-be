import express from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import {
    modifyBugReportStatus,
    getBugReportPrice
} from '@/domains/hunting/controller';

const router = express.Router();

router.put('/hunting/:matchId', authenticateToken, modifyBugReportStatus);
router.get('/hunting/:matchId/price', authenticateToken, getBugReportPrice);

export const huntingRoute = router;
