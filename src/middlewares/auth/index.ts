import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { sendResponse } from '../../common';
import { MESSAGE } from '../../lib';
import { getToken } from '../../services/token';

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendResponse(res, 401, MESSAGE.UNAUTHORIZED, {});
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded: any = verify(token, process.env.JWT_KEY as string);
    if (!decoded || !decoded.uuid) {
      throw new Error(MESSAGE.INVALID_TOKEN);
    }
    const data: any = await getToken({ uuid: decoded.uuid });
    if (!data) {
      throw new Error(MESSAGE.INVALID_TOKEN);
    }
    if (data.expiredAt && new Date(data.expiredAt).getTime() < Date.now()) {
      throw new Error(MESSAGE.TOKEN_EXPIRED);
    }
    (req as any).user = decoded;
    next();
  } catch (error) {
    sendResponse(res, 401, MESSAGE.UNAUTHORIZED, {});
  }
};
