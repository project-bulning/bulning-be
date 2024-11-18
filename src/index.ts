// src/index.ts
import express, { Request, Response } from 'express';
import 'dotenv/config';
import {kakaoLoginRoute} from './routes/kakaoLoginRoute';
import { bugPostRoute } from './routes/bugPostRoute';
import { bugListRoute } from './routes/bugListRoute';

const app = express();
const PORT = 3000;
app.use(express.json({ limit: '1mb' }));

// 기본 라우트 설정
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('',kakaoLoginRoute);
app.use('',bugPostRoute);
app.use('',bugListRoute);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
