import prisma from '@/utils/database';
import { Prisma } from '@prisma/client';
import { SimplifiedBugReport, GetBugReportsResponse, ProcessedBugReport,GetBugReportDetailsResponse } from '@/dto/reportDto';
import { differenceInMinutes, format } from 'date-fns';

//벌레 리포트 리스트 전체 조회 로직
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
        POINT(latitude, longitude),
        POINT(${currentLatitude}, ${currentLongitude})
      ) AS distance
    FROM bug_report
    ORDER BY distance ASC;
  `;

  const reports = await prisma.$queryRaw<
    (SimplifiedBugReport & { distance: number })[]
  >(selectQuery as unknown as Prisma.Sql);


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
      status: report.status|| 'UNKNOWN',
      bug_image_url: report.bug_image_url,
      price: report.price,
    };
  });

  return { bug_reports: processedReports };
};


// 게시물 상세 정보 조회 로직
export const fetchPostDetail = async (id: number): Promise<GetBugReportDetailsResponse | null> => {
    const bugReportDetail = await prisma.bugReport.findUnique({
      where: { id },
    });
    return bugReportDetail;
};
