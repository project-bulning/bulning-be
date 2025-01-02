import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 최신 게시물 조회 로직
export const fetchLatestPosts = async (): Promise<any> => {
    const posts = await prisma.bugReport.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    return calculateElapsedTime(posts);
};

// 위치 기반 게시물 조회 로직
export const fetchPostsByLocation = async (): Promise<any> => {

};

// 게시물 작성 시간 계산 함수
const calculateElapsedTime = (posts: any[]): any[] => {
    const now = new Date();
    return posts.map((post) => {
      const createdAt = new Date(post.created_at);
      const elapsedMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));
      return {
        ...post,
        elapsedTime: `${elapsedMinutes}분 전`,
      };
    });
};

// 게시물 상세 정보 조회 로직
export const fetchPostDetails = async (id: number): Promise<any> => {
    const post = await prisma.bugReport.findUnique({
      where: { id },
    });
    return post;
};
