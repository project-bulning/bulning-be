import express from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { uploadImageMiddleware } from '@/middlewares/fileUploadMiddleware';
import {
  createBugPost,
  getBugReportDetail,
  getBugReportList,
  uploadBugImage,
} from '@/domains/bugReport/controller';

const router = express.Router();

router.get('/bug-reports', getBugReportList);  // 사냥 리스트 조회
router.get('/bug-reports/:id', authenticateToken, getBugReportDetail);  // 사냥 상세 정보 조회

router.post('/bug-reports', authenticateToken, createBugPost);  // 벌레 정보 입력
router.post('/bug-reports/image', authenticateToken, uploadImageMiddleware.single('image'), uploadBugImage);  // 벌레 사진 입력

export const bugReportRoute = router;
