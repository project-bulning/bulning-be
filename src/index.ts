// src/index.ts
import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();
const PORT = 3000;

// 기본 라우트 설정
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
