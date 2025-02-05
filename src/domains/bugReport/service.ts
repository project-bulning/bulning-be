import {
  CreateBugReportRequestBody,
  GetBugReportDetailsResponse,
  GetBugReportsResponse,
  ProcessedBugReport,
} from '@/domains/bugReport/types';
import { Prisma, type User } from '@prisma/client';
import prisma from '@/utils/database';
// @ts-ignore
import { differenceInMinutes, format } from 'date-fns';
import { isValidS3Url } from '@/utils/upload';
import { BugReportCreateInputSchema } from '../../../prisma/generated/zod';
import { messaging } from '@/utils/firebase';

export const getAllBugReports = async (
  currentLatitude: number,
  currentLongitude: number
): Promise<GetBugReportsResponse> => {
  //현재 위도 경도로 거리 비교 후 가까운 순으로 정렬 - 4km
  const selectQuery: Prisma.Sql = Prisma.sql`
    SELECT
      id,
      title,
      created_at,
      status,
      bug_image_url,
      price,
      user_id,
      location,
      ST_DISTANCE_SPHERE(
        POINT(longitude,latitude),
        POINT(${currentLongitude},${currentLatitude})
      ) AS distance
    FROM BugReport
    WHERE status = 'WAITING_MATCH'
    HAVING distance <= 4000
    ORDER BY distance ASC, created_at ASC;
  `;

  const reports = await prisma.$queryRaw<
    (ProcessedBugReport & { distance: number, price: number, user_id:number })[]
  >(selectQuery as Prisma.Sql);

  //현재 시간 기준으로 몇 분 전인지
  const now = new Date();

  const processedReports: ProcessedBugReport[] = reports.map((report) => {
    //현재 시간과 생성 시간 차이
    const minutesDiff = differenceInMinutes(now, new Date(report.created_at));

    let createdAtLabel;
    if (minutesDiff < 60) {
      createdAtLabel = `${minutesDiff}분 전`;
    } else if (minutesDiff < 1440) { // 1440분은 24시간
      const hoursDiff = Math.floor(minutesDiff / 60); // 시간 단위로 변환
      createdAtLabel = `${hoursDiff}시간 전`;
    } else {
      createdAtLabel = format(new Date(report.created_at || 0), 'yyyy-MM-dd HH:mm:ss');
    }

    return {
      id: report.id,
      title: report.title,
      created_at: createdAtLabel,
      status: report.status || 'UNKNOWN',
      bug_image_url: report.bug_image_url,
      price: report.price,
      location: report.location,
      distance: Math.round(report.distance),
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
    const { user,created_at,user_id, latitude, longitude, ...bugReportDetails } = bugReport;

    // 현재 시간 기준
    const now = new Date();
    // 현재 시간과 생성 시간 차이 계산
    const minutesDiff = differenceInMinutes(now, new Date(bugReport.created_at || 0));

    let createdAtLabel;
    if (minutesDiff < 60) {
      createdAtLabel = `${minutesDiff}분 전`;
    } else if (minutesDiff < 1440) { // 1440분은 24시간
      const hoursDiff = Math.floor(minutesDiff / 60); // 시간 단위로 변환
      createdAtLabel = `${hoursDiff}시간 전`;
    } else {
      createdAtLabel = format(new Date(bugReport.created_at || 0), 'yyyy-MM-dd HH:mm:ss');
    }

    // 위도와 경도에 소숫점 다섯 번째 자리에서 랜덤값 추가
    const addNoiseToCoordinate = (coordinate: number): number => {
    const noise = (Math.random() - 0.5) * 0.00002; // -0.00001 ~ 0.00001 사이의 랜덤값을 생성
    return parseFloat((coordinate + noise).toFixed(5)); // 소숫점 다섯 번째 자리로 반올림
    };

  const noisyLatitude = addNoiseToCoordinate(bugReport.latitude);
  const noisyLongitude = addNoiseToCoordinate(bugReport.longitude);

    // 반환할 객체
    return {
      ...bugReportDetails,
      nickname: user?.nickname || '',
      latitude: noisyLatitude,
      longitude: noisyLongitude,
      created_at: createdAtLabel,
    };
};

export const createBugReport = async (data: CreateBugReportRequestBody, user: User) => {
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
  const bugReport = await prisma.bugReport.create({
    data: creationInput,
  });

  // 반경 4km 이내에 있는 사용자 찾아서 알림 보내기
  const { latitude, longitude } = bugReport;
  const nearbyUsers = await prisma.$queryRaw<
    { id: number; fcm_token: string | null }[]
  >(
    Prisma.sql`
    SELECT id, fcm_token
    FROM User
    WHERE fcm_token IS NOT NULL
    AND ST_DISTANCE_SPHERE(
      POINT(longitude, latitude),
      POINT(${longitude}, ${latitude})
    ) <= 4000;
  `
  );

  //  FCM 토큰 리스트 추출
  const fcmTokens = nearbyUsers
    .map((user) => user.fcm_token)
    .filter((token): token is string => token !== null);

  // FCM 알림 전송
  if (fcmTokens.length > 0) {
    const message = {
      tokens: fcmTokens,
      notification: {
        title: "우리 동네에 벌레가 나타났어요!",
        body: `빠르게 정보를 확인하고 ${bugReport.price}원을 얻어보세요`,
      },
      data:{
        type: "help_posted", 
        bugtrport_id: `${bugReport.id}`
      },
    };
    
    // FCM을 통해 알림 전송
    await messaging.sendEachForMulticast(message)
    console.log("핼피 포스트 알림 전송 완료");

    return bugReport;
  }
};
