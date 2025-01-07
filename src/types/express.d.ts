import { Request } from 'express';
import { User } from '@prisma/client';

interface AuthenticatedRequest<Params = {}, ReqBody = {}> extends Request<{}, Params, ReqBody> {
  user?: User;
}
