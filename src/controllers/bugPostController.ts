import { BugPostModel } from '../dto/bugDto';
import { Request, Response } from 'express';
import { createPost} from '../services/bugPostService';

// 벌레 정보 입력
export const createBugPost = async (req: Request, res: Response): Promise<void> => {
    console.log("Request body:", req.body);
  try {
    const { title, bug_type, bug_size, equipment, note, price } = req.body || {};
    await createPost({ title, bug_type, bug_size, equipment, note, price });
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

// 벌레 사진 입력
export const uploadBugImage = async (req: Request, res: Response): Promise<void> => {
  
};
