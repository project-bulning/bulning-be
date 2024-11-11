import express from 'express';
import { kakaoLogin, kakaoCallback } from '../controllers/kakaoLoginController';

const router = express.Router();

router.get('/login/kakao', kakaoLogin);
router.get('/login/kakao/callback', kakaoCallback);

export const kakaoLoginRoute = router;