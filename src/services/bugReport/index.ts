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
      title,
      created_at,
      status,
      bug_image_url,
      price,
      user_id,
      ST_DISTANCE_SPHERE(
        POINT(longitude,latitude),
        POINT(${currentLongitude},${currentLatitude})
      ) AS distance
    FROM BugReport
    ORDER BY distance ASC;
  `;

  const reports = await prisma.$queryRaw<
    (ProcessedBugReport & { distance: number, price: number, user_id:number })[]
  >(selectQuery as Prisma.Sql);

  //위치
  const userIds = reports.map((report) => report.user_id);
  const users = await prisma.user.findMany({
  where: {
    id: { in: userIds },
  },
  select: {
    id: true,
    location: true,
  },
});

const userLocationMap = users.reduce((map, user) => {
  map[user.id] = user.location || "알 수 없음";
  return map;
}, {} as Record<number, string>);


  //현재 시간 기준으로 몇 분 전인지
  const now = new Date();

  const processedReports: ProcessedBugReport[] = reports.map((report) => {
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
      title: report.title,
      created_at: createdAtLabel,
      status: report.status || 'UNKNOWN',
      bug_image_url: report.bug_image_url,
      price: report.price,
      location: userLocationMap[report.user_id] || "알 수 없음",
    };
  });

  return { bug_reports: processedReports };
};


// 게시물 상세 정보 조회 로직
export const fetchPostDetail = async (id: number): Promise<GetBugReportDetailsResponse | null> => {
 
    // BugReport 조회
    const bugReport = await prisma.bugReport.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!bugReport) {
      throw new Error('해당 ID의 bugReport는 없습니다.');
    }

    // 필요한 정보만 추출하여 반환
    const { user,created_at,user_id, ...bugReportDetails } = bugReport;

    // 현재 시간 기준
    const now = new Date();
    // 현재 시간과 생성 시간 차이 계산
    const minutesDiff = differenceInMinutes(now, new Date(bugReport.created_at || 0));

    let createdAtLabel;
    if (minutesDiff < 60) {
      createdAtLabel = `${minutesDiff}분 전`;
    } else {
      createdAtLabel = format(new Date(bugReport.created_at || 0), 'yyyy-MM-dd HH:mm:ss');
    }

    // 반환할 객체 구성
    return {
      ...bugReportDetails,
      name: user?.name || '',
      location: user?.location || '',
      created_at: createdAtLabel,
    };
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
