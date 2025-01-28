import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { kakaoLoginRoute } from '@/domains/auth/route';
import { userRoute } from '@/domains/user/route';
import cors from 'cors';
import fs from 'node:fs';
import https from 'https';
import * as path from 'node:path';
import { sendError } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { matchRoute } from '@/domains/match/route';
import { alarmRoute } from '@/domains/alarm/route';
import { bugReportRoute } from '@/domains/bugReport/route';
import { WebSocketServer } from 'ws';
import * as http from 'node:http';
import { route } from '@/domains/review/route';
import { handleSocketConnection } from '@/domains/chat/socket';

const app = express();
const DEV_PORT = 3000;
const PRODUCTION_PORT = 443;
const PORT = process.env.NODE_ENV == 'development' ? DEV_PORT : PRODUCTION_PORT;
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
app.use(API_PREFIX, bugReportRoute);
app.use(API_PREFIX, userRoute);
app.use(API_PREFIX, matchRoute);
app.use(API_PREFIX, alarmRoute);
app.use(API_PREFIX, route);

app.get('*', (req: Request, res: Response) => {
  if (req.path.startsWith('/api')) {
    sendError(res, 'API NOT FOUND', StatusCodes.NOT_FOUND);
  } else {
    res.sendFile(path.join(VIEW_DIRECTORY, 'index.html'));
  }
});

// 서버 시작
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test-server') {
  const keyPath = process.env.SSL_PRIVKEY as string;
  const caPath = process.env.SSL_CERT as string;
  const certPath = process.env.SSL_FULLCHAIN as string;
  const securityConfig = {
    key: fs.readFileSync(keyPath),
    ca: fs.readFileSync(caPath),
    cert: fs.readFileSync(certPath),
  };
  const server = https.createServer(securityConfig, app);
  server.listen(PORT, () => {
    console.log(`Server is running on ${process.env.BASE_URL}:${PORT}`)
  });
  const wss = new WebSocketServer({ server });
  wss.on('connection', handleSocketConnection);
} else {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  const ws = new WebSocketServer({ server });
  ws.on('connection', handleSocketConnection);
}
