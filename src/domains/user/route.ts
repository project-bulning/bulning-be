import express from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { getMyInfo, signoutMyInfo, updateUser,logoutUser } from '@/domains/user/controller';

const router = express.Router();

router.get('/my-info', authenticateToken, getMyInfo);
router.post('/user/signout', authenticateToken, signoutMyInfo);
router.post('/user/info/new', authenticateToken, updateUser);
router.post('/user/logout', authenticateToken, logoutUser);

export const userRoute = router;
