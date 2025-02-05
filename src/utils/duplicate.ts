import prisma from '@/utils/database';
  
export  const checkDuplicateMatch = async (userId: number, reportID: number) => {
    const existingMatch = await prisma.match.findFirst({
      where: {
        bug_report_id: reportID,
        hunter_id: userId,
        status: 'PENDING',
      },
    });
  
    if (existingMatch) {
      throw new Error('이미 이 버그 리포트에 대해 매칭된 상태입니다.');
    }
};
  
// export const checkDuplicateReview = async (matchId: number, userId: number) => {
//     // 예: 이미 해당 매치에 대해 리뷰가 작성되었는지 확인
//     const existingReview = await prisma.userReview.findFirst({
//       where: {
//         user_id: userId,
//         //match_id: matchId,
//       },
//     });
  
//     if (existingReview) {
//       throw new Error('이미 리뷰가 작성되었습니다.');
//     }
// };
  