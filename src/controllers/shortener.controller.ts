import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { prismaClient } from "../prisma/prisma";
import { JwtPayload } from "../types/auth";
import { CreateRequestBody } from "../types/shortener";

const create = async (
  req: Request<{}, {}, CreateRequestBody>,
  res: Response,
) => {
  const { base } = req.body;
  // @ts-ignore
  const user: JwtPayload | undefined = req.user;
  const id = uuidv4().slice(0, 6);
  const response = await prismaClient.url.create({
    data: {
      base: base,
      id: id,
      shortened: `${process.env.BASE_URL_K}/anchor/${id}`,
      userId: user?.id,
    },
  });

  return res.json(response);
};

export const shortener = {
  create: create,
};
