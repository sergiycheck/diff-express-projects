import { NextFunction, Request, Response } from 'express';

const getTodo = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    todo: {
      id: 1,
      data: 'todo data',
      date: new Date().toISOString(),
    },
  });
};

export default {
  getTodo,
};
