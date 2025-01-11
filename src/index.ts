import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { kakaoLoginRoute } from './routes/kakaoLoginRoute';
import { bugPostRoute } from './routes/bugPostRoute';
import { bugListRoute } from './routes/bugListRoute';
import { userRoute } from '@/routes/user';
import cors from 'cors';
import fs from 'node:fs';
import https from 'https';
import * as path from 'node:path';
import { sendError } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { alarmRoute } from './routes/alarmRoute';

const app = express();
const DEV_PORT = 3000;
const PRODUCTION_PORT = 443;
const API_PREFIX = '/api';
const VIEW_DIRECTORY = path.resolve(process.env.VIEW_DIRECTORY as string);

app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin: '*'
}));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  express.static(VIEW_DIRECTORY)(req, res, next);
});

app.use(API_PREFIX, kakaoLoginRoute);
app.use(API_PREFIX, bugPostRoute);
app.use(API_PREFIX, bugListRoute);
app.use(API_PREFIX, userRoute);
app.use(API_PREFIX, alarmRoute);

app.get('*', (req: Request, res: Response) => {
  if (req.path.startsWith('/api')) {
    sendError(res, 'API NOT FOUND', StatusCodes.NOT_FOUND);
  } else {
    res.sendFile(path.join(VIEW_DIRECTORY, 'index.html'));
  }
});

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
