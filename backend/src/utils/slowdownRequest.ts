import { NextFunction, Request, Response } from "express";

export const slowdownRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  setTimeout(() => {
    next();
  }, 4000);
};
