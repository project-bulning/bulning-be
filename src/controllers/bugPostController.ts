import { Request, Response } from 'express';
import { sendError } from '@/utils/response';
import { uploadToS3 } from '@/utils/upload';
import { CreateBugImageResponse } from '@/dto/reportDto';

// 벌레 정보 입력
export const createBugPost = async (req: Request, res: Response) => {
    console.log("Request body:", req.body);
  try {
    const { title, bug_type, bug_size, equipment, note, price } = req.body || {};
    //await createPost({ title, bug_type, bug_size, equipment, note, price });
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
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
