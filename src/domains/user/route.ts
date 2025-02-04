import express from 'express';
import { authenticateToken } from '@/middlewares/authMiddleware';
import { getMyInfo, signoutMyInfo, updateUser, uploadHunterImage } from '@/domains/user/controller';
import { uploadImageMiddleware } from '@/middlewares/fileUploadMiddleware';

const router = express.Router();

router.get('/my-info', authenticateToken, getMyInfo);
router.post('/user/signout', authenticateToken, signoutMyInfo);
router.post('/user/info/new', authenticateToken, updateUser);
router.post('/user/hunter/image', authenticateToken,uploadImageMiddleware.single('image'), uploadHunterImage);

export const userRoute = router;
