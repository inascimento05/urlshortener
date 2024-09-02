import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../prisma/prisma";
import { JwtPayload } from "../types/auth";
import { RemoveParams, UpdateRequestBody } from "../types/url";

const all = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const user: JwtPayload | undefined = req.user;
  if (user === undefined)
    res.status(401).json({ message: "Unauthorized user" });

  const urls = await prismaClient.url.findMany({
    where: { inactive: null, userId: user?.id },
  });

  return res.json(urls);
};

const remove = async (
  req: Request<RemoveParams>,
  res: Response,
  next: NextFunction,
) => {
  // @ts-ignore
  const user: JwtPayload | undefined = req.user;
  if (user === undefined)
    return res.status(401).json({ message: "Unauthorized user" });

  const url = await prismaClient.url.findUnique({
    where: { id: req.params.id },
  });
  if (url === null) return res.status(404).json({ message: "URL not found" });
  if (url.userId !== user.id)
    return res.status(401).json({ message: "Unauthorized user" });

  const update = await prismaClient.url.update({
    data: { inactive: new Date() },
    where: {
      id: req.params.id,
      userId: user.id,
    },
  });

  return res.status(200).json(update);
};

const update = async (
  req: Request<RemoveParams, {}, UpdateRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  // @ts-ignore
  const user: JwtPayload | undefined = req.user;
  if (user === undefined)
    return res.status(401).json({ message: "Unauthorized user" });

  const url = await prismaClient.url.findUnique({
    where: { id: req.params.id },
  });
  if (url === null) return res.status(404).json({ message: "URL not found" });
  if (url.userId !== user.id)
    return res.status(401).json({ message: "Unauthorized user" });

  const update = await prismaClient.url.update({
    data: { base: req.body.base },
    where: {
      id: req.params.id,
      userId: user.id,
    },
  });

  return res.status(200).json(update);
};

export const url = {
  all: all,
  remove: remove,
  update: update,
};
