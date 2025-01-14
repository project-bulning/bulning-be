import { Request } from 'express';
import { User } from '@prisma/client';

interface AuthenticatedRequest<Params = {}, ReqBody = {}, ReqQuery = {}> extends Request<
  Params, {}, ReqBody, ReqQuery> {
  user?: User;
}
