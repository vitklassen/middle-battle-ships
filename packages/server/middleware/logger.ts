import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log('[API]', req.method, req.originalUrl);
  next();
};
