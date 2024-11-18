import express from 'express';
import { createBugPost, uploadBugImage } from '../controllers/bugPostController';

const router = express.Router();

router.post('/bug', createBugPost);  // 벌레 정보 입력
router.post('/bug/image', uploadBugImage);  // 벌레 사진 입력

export const bugPostRoute = router;