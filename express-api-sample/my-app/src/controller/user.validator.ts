import { Router, Response, Request, NextFunction } from "express";
import { UserEntity } from "../database/entities/user.entity";
import { BadRequestError } from "../errors/http/errors";

export class UserValidator {
  public validateAge = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = req["body"] as UserEntity;
    const minimumAge = 18;
    if (!("age" in user) || Number(user.age) < minimumAge) {
      next(
        new BadRequestError(
          `use age ( ${
            user ? user?.age : "unset"
          } ) is less that minimum allowed age ( ${minimumAge} )`
        )
      );
    } else {
      next("route");
    }
  };
}
