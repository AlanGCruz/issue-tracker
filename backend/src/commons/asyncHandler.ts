import { type Request, type Response, type NextFunction, type RequestHandler } from "express";

export function asyncHandler<
P = any,
ResBody = any,
ReqBody = any,
ReqQuery = any,
>(
  fn: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<any>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  };
}