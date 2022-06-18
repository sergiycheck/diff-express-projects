import { Request, Response, NextFunction } from "express";
import httpContext from "express-http-context";

export function loggingBefore(req: Request, res: Response, next: NextFunction) {
  console.log("do someting before...");
  console.log("set traceID = 123");
  httpContext.set("traceId", 123);
  next();
}

export function loggingAfter(req: Request, res: Response, next: NextFunction) {
  console.log("do someting after...");
  console.log(`traceId = ${httpContext.get("traceId")}`);
  next();
}
