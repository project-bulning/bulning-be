import express from 'express';
import { getBugReportList, getBugReportDetail } from '@/controllers/bugListController';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.get('/bug-reports', getBugReportList);  // 사냥 리스트 조회
router.get('/bug-reports/:id', authenticateToken, getBugReportDetail);  // 사냥 상세 정보 조회

export const bugListRoute = router;
