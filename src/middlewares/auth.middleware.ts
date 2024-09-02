import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization =
    req.headers["authorization"] === undefined ?
      ""
    : req.headers["authorization"];
  const token = authorization.replace("Bearer ", "");

  // @ts-ignore
  if (token === "") req.user = undefined;
  // @ts-ignore
  else req.user = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

  return next();
};
