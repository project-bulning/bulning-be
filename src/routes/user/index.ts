import express from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { getMyInfo, signoutMyInfo } from '@/controllers/user';

const router = express.Router();

router.get('/my-info', authenticateToken, getMyInfo);
router.post('/user/signout', authenticateToken, signoutMyInfo);

export const userRoute = router;
