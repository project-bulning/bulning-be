import { Request, Response } from 'express';
import { sendError } from '@/utils/response';
import { AuthenticatedRequest } from '@/types/express';
import { StatusCodes } from 'http-status-codes';
import { getAllBugReports, fetchPostDetails } from '@/services/bugListService';
import {
  SimplifiedBugReport, GetBugReportsResponse, ProcessedBugReport
} from '@/dto/reportDto';

// 사냥 리스트 조회
export const getBugReportList = async (req: Request, res: Response<GetBugReportsResponse>)=>{
  try {
    const { currentLatitude, currentLongitude } = req.body;

    if (typeof currentLatitude !== 'number' || typeof currentLongitude !== 'number') {
      return sendError(res, '현재 위도와 경도를 숫자 형태로 제공해야 합니다.');
    }

    const bugReports = await getAllBugReports(currentLatitude, currentLongitude);

    res.status(StatusCodes.OK).json(bugReports);
  } catch (error) {
    console.error('Error fetching bug reports:', error);
    return sendError(res, '버그 리포트를 가져오는 중 오류가 발생했습니다..');
  }
};

// 사냥 상세 정보 조회
export const getBugPostDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.query;
      const post = await fetchPostDetails(Number(id));
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post details:', error);
      res.status(500).json({ message: 'Failed to fetch post details' });
    }
};
