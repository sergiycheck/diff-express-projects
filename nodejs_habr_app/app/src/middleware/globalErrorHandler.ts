import { Request, Response, NextFunction } from "express";
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "after" })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction) {
    res.status(error.statusCode || error.httpCode).json(error);
    next();
  }
}
