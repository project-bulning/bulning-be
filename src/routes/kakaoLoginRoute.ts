import express from 'express';
import { kakaoLogin, kakaoCallback } from '../controllers/kakaoLoginController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/user/login/kakao', kakaoLogin);
router.get('/login/kakao/callback', kakaoCallback);
//router.post('/user/info', authenticateToken, userInfo);

export const kakaoLoginRoute = router;