// src/index.ts
import express, { Request, Response } from 'express';
import 'dotenv/config';
import { kakaoLoginRoute } from './routes/kakaoLoginRoute';
import { bugPostRoute } from './routes/bugPostRoute';
import { bugListRoute } from './routes/bugListRoute';
import { userRoute } from '@/routes/user';
import cors from 'cors';
import fs from 'node:fs';
import https from 'https';

const app = express();
const DEV_PORT = 3000;
const PRODUCTION_PORT = 443;
const API_PREFIX = '/api'

app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin: '*'
}));

// 기본 라우트 설정
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use(API_PREFIX, kakaoLoginRoute);
app.use(API_PREFIX, bugPostRoute);
app.use(API_PREFIX, bugListRoute);
app.use(API_PREFIX, userRoute);

// 서버 시작
if(process.env.NODE_ENV === 'production') {
  const keyPath = process.env.SSL_PRIVKEY as string;
  const caPath = process.env.SSL_CERT as string;
  const certPath = process.env.SSL_FULLCHAIN as string;
  const securityConfig = {
    key: fs.readFileSync(keyPath),
    ca: fs.readFileSync(caPath),
    cert: fs.readFileSync(certPath),
  };
  const server = https.createServer(securityConfig, app);
  server.listen(PRODUCTION_PORT, () => `Server is running on ${process.env.BASE_URL}:${PRODUCTION_PORT}`);
} else {
  app.listen(DEV_PORT, () => {
    console.log(`Server is running on http://localhost:${DEV_PORT}`);
  });
}
