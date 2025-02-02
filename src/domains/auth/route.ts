import express from 'express';
import {
  kakaoLogin,
  kakaoCallback,
  userInfo,
  reissue,
} from '@/domains/auth/controller';
import { authenticateToken } from '@/middlewares/authMiddleware';

const router = express.Router();

router.get('/user/login/kakao', kakaoLogin);
router.get('/login/kakao/callback', kakaoCallback);
router.post('/user/info', authenticateToken, userInfo);
router.post('/reissue', reissue);

export const kakaoLoginRoute = router;
