import express from 'express';
import { kakaoLogin, kakaoCallback, userInfo } from '../controllers/kakaoLoginController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/user/login/kakao', kakaoLogin);
router.get('/login/kakao/callback', kakaoCallback);
//router.post('/user/info', authenticateToken, userInfo);

export const kakaoLoginRoute = router;