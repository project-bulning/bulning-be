import { Request, Response } from 'express';
import { fetchLatestPosts, fetchPostsByLocation, fetchPostDetails } from '../services/bugListService';

// 사냥 리스트 조회
export const getBugPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Query parameters:", req.query);

      const sortBy= (req.query.sortBy as string) || "";
      let posts;

      if (sortBy === 'latest') {
        posts = await fetchLatestPosts();
      } else if (sortBy === 'location') {
        posts = await fetchPostsByLocation();
      } else {
        res.status(400).json({ message: 'Invalid sortBy value. Please provide it.' });
        return;
      }

      // 필요한 정보만 추출하여 응답
      const simplifiedPosts = posts.map((post: { bug_image_url: any; price: any; elapsedTime: any; }) => ({
        bug_image_url: post.bug_image_url,
        price: post.price,
        elapsedTime: post.elapsedTime,
      }));

      res.status(200).json(simplifiedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Failed to fetch posts' });
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
