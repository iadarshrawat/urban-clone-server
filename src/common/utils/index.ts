import { Response } from 'express';

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = {},
  meta: any = {}
) => {
  return res
    .status(statusCode)
    .json({
      status: statusCode >= 200 && statusCode < 300,
      message,
      data,
      meta
    });
};

export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const logger = {
  info: (...args: Array<any>) => process.env.NODE_ENV === 'development' && console.log(...args),
  warn: (...args: Array<any>) => console.warn(...args),
  error: (...args: Array<any>) => console.error(...args)
};
