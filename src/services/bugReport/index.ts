import {
  CreateBugReportRequestBody,
  GetBugReportDetailsResponse,
  GetBugReportsResponse,
  ProcessedBugReport,
} from '@/dto/reportDto';
import { Prisma, type User } from '@prisma/client';
import prisma from '@/utils/database';
// @ts-ignore
import { differenceInMinutes, format } from 'date-fns';
import { isValidS3Url } from '@/utils/upload';
import { BugReportCreateInputSchema } from '../../../prisma/generated/zod';

export const getAllBugReports = async (
  currentLatitude: number,
  currentLongitude: number
): Promise<GetBugReportsResponse> => {
  //현재 위도 경도로 거리 비교 후 가까운 순으로 정렬
  const selectQuery: Prisma.Sql = Prisma.sql`
    SELECT
      id,
      created_at,
      status,
      bug_image_url,
      price,
      ST_DISTANCE_SPHERE(
        POINT(longitude,latitude),
        POINT(${currentLongitude},${currentLatitude})
      ) AS distance
    FROM BugReport
    ORDER BY distance ASC;
  `;

  const reports = await prisma.$queryRaw<
    (ProcessedBugReport & { distance: number, price: number })[]
  >(selectQuery as Prisma.Sql);


  //현재 시간 기준으로 몇 분 전인지
  const now = new Date();

  const processedReports: ProcessedBugReport[] = reports.map((report) => {
    //생성 시간이 null일 경우 처리
    if (!report.created_at) {
      return {
        id: report.id,
        created_at: '알 수 없음',
        status: report.status || 'UNKNOWN',
        bug_image_url: report.bug_image_url,
        price: report.price,
      };
    }
    //현재 시간과 생성 시간 차이
    const minutesDiff = differenceInMinutes(now, new Date(report.created_at));

    let createdAtLabel;
    if (minutesDiff < 60) {
      createdAtLabel = `${minutesDiff}분 전`;
    } else {
      createdAtLabel = format(new Date(report.created_at), 'yyyy-MM-dd HH:mm:ss');
    }

    return {
      id: report.id,
      created_at: createdAtLabel,
      status: report.status || 'UNKNOWN',
      bug_image_url: report.bug_image_url,
      price: report.price,
    };
  });

  return { bug_reports: processedReports };
};


// 게시물 상세 정보 조회 로직
export const fetchPostDetail = (id: number): Promise<GetBugReportDetailsResponse | null> => {
  return prisma.bugReport.findUnique({
    where: {id},
  });
};

export const createBugReport = (data: CreateBugReportRequestBody, user: User) => {
  if(data.bug_image_url && ! isValidS3Url(data.bug_image_url)) {
    throw new Error('올바르지 않은 이미지 URL입니다.');
  }
  if(data.price < 0) {
    throw new Error('값이 0보다 작을 수 없습니다.');
  }
  const creationInput = {
    ...data,
    user: {
      connect: {
        id: user.id,
      }
    },
  }
  BugReportCreateInputSchema.parse(creationInput);
  return prisma.bugReport.create({
    data: creationInput,
  });
};
