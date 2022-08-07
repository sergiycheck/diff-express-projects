import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) return next(error);

  res.status(200).json({ error });
};

export default errorHandler;
