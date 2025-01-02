import express from 'express';
import { getBugPosts, getBugPostDetails} from '../controllers/bugListController';
const router = express.Router();

router.get('/catch-requests', getBugPosts);  // 사냥 리스트 조회
router.get('/catch-requests/more', getBugPostDetails);  // 사냥 상세 정보 조회

export const bugListRoute = router;
