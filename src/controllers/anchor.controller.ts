import { Request, Response } from "express";
import { prismaClient } from "../prisma/prisma";

const redirect = async (req: Request, res: Response) => {
  const id = req.params.id;
  const url = await prismaClient.url.findUnique({ where: { id: id } });

  if (url === null) return res.status(404).send("URL not found");

  await prismaClient.url.update({
    data: { clicks: { increment: 1 } },
    where: { id: id },
  });

  res.redirect(url.base);
};

export const anchor = {
  redirect: redirect,
};
