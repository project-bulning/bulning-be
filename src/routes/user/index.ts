import express from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { getMyInfo, signoutMyInfo, updateUser } from '@/controllers/user';

const router = express.Router();

router.get('/my-info', authenticateToken, getMyInfo);
router.post('/user/signout', authenticateToken, signoutMyInfo);
router.post('/user/info/new', authenticateToken, updateUser);

export const userRoute = router;
