import { Chat, Match, User } from '@prisma/client';
import { WebSocket } from 'ws';
import { getMatchByUser } from '@/services/match';
import prisma from '@/utils/database';
import {
  ReadChatRequest,
  SocketMessage,
  WriteChatRequest, WriteChatRequestSchema,
} from '@/dto/socketDto';

export default class Session {
  private readonly _ws: WebSocket;
  private readonly _user: User;
  public static userSessions: { [key: number]: Session } = {};
  private async createMessage(message: string) {
    const match = await this.getMatch() as Match;
    if(!this.isMatchOpen(match)) {
      throw new Error('메시지를 보낼 수 있는 상태가 아닙니다.');
    }
    const targetId: number = match?.hunter_id === this.user.id ? match?.helper_id : match?.hunter_id;
    const targetSession = Session.userSessions[targetId];
    const status = targetSession && !targetSession.isClosed() ? 'READ_COMPLETE' : 'UNREAD';
    const chat = await prisma.chat.create({
      data: {
        status,
        target_id: targetId,
        issuer_id: this.user.id,
        content: message,
      }
    });
    return targetSession.sendMessage(chat);
  }
  public async sendUnreadMessages() {
    const match = await this.getMatch() as Match;
    const chats = await prisma.chat.findMany({
      where: {
        target_id: this.user.id,
        status: 'UNREAD',
        match: match,
      }
    });
    this.websocket.send(JSON.stringify(chats));
  }
  public handleRequest(message: string) {
    const req = JSON.parse(message) as SocketMessage;
    if (req.message_type === 'read') {
      this.handleWriteChat(req as WriteChatRequest);
    } else if (req.message_type === 'write') {
      this.handleReadChat(req as ReadChatRequest);
    } else {
      this.handleClose();
    }
  }
  public handleClose() {
    this.websocket.close();
    delete Session.userSessions[this.user.id]; // destruction
  }
  public readAllChats() {
    return prisma.chat.updateMany({
      data: {
        status: 'READ_COMPLETE',
      },
      where: {
        target_id: this.user.id,
      }
    })
  }
  public handleReadChat(req: ReadChatRequest) {
    this.readAllChats();
  }
  public handleWriteChat(req: WriteChatRequest) {
    try {
      WriteChatRequestSchema.parse(req);
      this.createMessage(req.content);
    } catch(e) {
      console.error(e);
    }
  }
  public sendMessage(chat: Chat) {
    this.websocket.send(JSON.stringify(chat));
  }
  private getMatch() {
    return getMatchByUser(this.user);
  }

  private isMatchOpen(match?: Match | null) {
    return match && match.status === 'MATCH_ACCEPTED'; // 캐싱 해야될듯
  }

  private isClosed(): boolean {
    return this.websocket.readyState === WebSocket.CLOSED;
  }

  public async init() {
    const match = await this.getMatch();
    if(!this.isMatchOpen(match)) {
      throw new Error('진행중인 매치가 없습니다.');
    }
    this.sendUnreadMessages();
  }

  constructor(ws: WebSocket, user: User) {
    this._ws = ws;
    this._user = user;
  }

  get user(): User {
    return this._user;
  }

  get websocket(): WebSocket {
    return this._ws;
  }
}
