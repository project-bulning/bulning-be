import { Request, Response } from 'express';
import { sendError } from '@/utils/response';
import { uploadToS3 } from '@/utils/upload';
import {
  CreateBugImageResponse,
  CreateBugReportRequestBody, CreateBugReportResponse,
} from '@/dto/reportDto';
import { AuthenticatedRequest } from '@/types/express';
import { StatusCodes } from 'http-status-codes';
import { createBugReport } from '@/services/bugPostService';

// 벌레 정보 입력
export const createBugPost = async (req: AuthenticatedRequest<{}, CreateBugReportRequestBody>,
                                    res: Response<CreateBugReportResponse>) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }
  try {
    await createBugReport(req.body, req.user);
    res.status(StatusCodes.CREATED).send();
  } catch(e) {
    console.error(e);
    return sendError(res, '게시글 업로드에 실패했습니다.');
  }
};

// 벌레 사진 입력
export const uploadBugImage = async (req: Request, res: Response<CreateBugImageResponse>) => {
  if(! req.file) {
    return sendError(res, '파일이 업로드되지 않았습니다.');
  }
  try {
    const url = await uploadToS3(req.file);
    res.json({
      image_url: url,
    });
  } catch(e) {
    console.error(e);
    return sendError(res, '파일 업로드에 실패했습니다.');
  }
}
