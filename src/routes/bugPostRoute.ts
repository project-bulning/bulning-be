import express from 'express';
import { createBugPost, uploadBugImage } from '@/controllers/bugPostController';
import { uploadImageMiddleware } from '@/middlewares/fileUploadMiddleware';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.post('/bug', authenticateToken, createBugPost);  // 벌레 정보 입력
router.post('/bug/image', authenticateToken, uploadImageMiddleware.single('image'), uploadBugImage);  // 벌레 사진 입력

export const bugPostRoute = router;
