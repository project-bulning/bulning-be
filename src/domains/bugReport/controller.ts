import { Request, Response } from 'express';
import { sendError } from '@/utils/response';
import { AuthenticatedRequest } from '@/types/express';
import { StatusCodes } from 'http-status-codes';
import {
  GetBugReportsResponse,
  GetBugReportDetailsResponse,
  CreateBugReportRequestBody, CreateBugReportResponse, CreateBugImageResponse,
} from '@/domains/bugReport/types';
import { uploadToS3 } from '@/utils/upload';
import {
  createBugReport,
  fetchPostDetail,
  getAllBugReports,
  delBugReportService,
} from '@/domains/bugReport/service';

// 사냥 리스트 조회
export const getBugReportList = async (
  req: Request<{}, {}, {}, { currentLatitude?: string; currentLongitude?: string }>,
  res: Response<GetBugReportsResponse>
)=>{
  try {
    const { currentLatitude, currentLongitude } = req.query;

    // 쿼리 파라미터 검증 및 변환
    if (!currentLatitude || !currentLongitude) {
      return sendError(res, '현재 위도와 경도를 쿼리 파라미터로 제공해야 합니다.');
    }

    const latitude = parseFloat(currentLatitude);
    const longitude = parseFloat(currentLongitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      return sendError(res, '위도와 경도는 숫자여야 합니다.');
    }

    const bugReports = await getAllBugReports(latitude, longitude);

    res.status(StatusCodes.OK).json(bugReports);
  } catch (error) {
    console.error('Error fetching bug reports:', error);
    return sendError(res, '버그 리포트를 가져오는 중 오류가 발생했습니다..');
  }
};

// 사냥 상세 정보 조회
export const getBugReportDetail = async (
  req: AuthenticatedRequest<{id: string},{}>,
  res: Response<GetBugReportDetailsResponse>
) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }

  try {
    const { id }  = req.params;
    console.log(Number(id))
    if (!id || isNaN(Number(id))) {
      return sendError(res, '유효한 버그 리포트 ID를 제공해야 합니다.');
    }

    const bugReportDetail = await fetchPostDetail(Number(id));
    if (!bugReportDetail) {
      return sendError(res, '해당 ID의 버그 리포트를 찾을 수 없습니다.');
    }

    res.status(StatusCodes.OK).json(bugReportDetail);
  } catch (error) {
    console.error('Error fetching bug report details:', error);
    return sendError(res, '버그 리포트 상세 정보를 가져오는 중 오류가 발생했습니다.',500);
  }
};

// 사냥 게시글 작성
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

//삭제
export const delBugReport = async (
  req: AuthenticatedRequest<{id: string},{}>,
  res: Response
) => {
  if(! req.user) {
    return sendError(res, '로그인된 사용자가 아닙니다.', StatusCodes.UNAUTHORIZED);
  }

  try {
    const { id }  = req.params;
    console.log(Number(id))
    if (!id || isNaN(Number(id))) {
      return sendError(res, '유효한 버그 리포트 ID를 제공해야 합니다.');
    }

    const bugReport = await delBugReportService(Number(id));
    if (!bugReport) {
      return sendError(res, '해당 ID의 버그 리포트를 찾을 수 없습니다.');
    }

    res.status(StatusCodes.OK).json(bugReport);
  } catch (error) {
    console.error('Error fetching bug report details:', error);
    if (error instanceof Error) {
      return sendError(res, error.message, StatusCodes.BAD_REQUEST);
    }
    return sendError(res, '해당 버그 리포트를 삭제하는 중 오류가 발생했습니다.', StatusCodes.INTERNAL_SERVER_ERROR);
  }
};