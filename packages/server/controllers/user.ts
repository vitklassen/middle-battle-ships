import { Request, Response } from 'express';

export const user = async (req: Request, res: Response) => {
  res.send(req.user);
};
