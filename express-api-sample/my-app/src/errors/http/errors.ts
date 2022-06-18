import { ApiHttpError } from "./api-http-error";

export class NotFoundError extends ApiHttpError {
  constructor(message: string, stack?: string, errorKey?: string) {
    super(message, stack, errorKey);
    this.status = 404;
  }
}

export class BadRequestError extends ApiHttpError {
  constructor(message: string, stack?: string, errorKey?: string) {
    super(message, stack, errorKey);
    this.status = 400;
  }
}
