import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "../prisma/prisma";
import { JwtPayload } from "../types/auth";
import { SigninRequestBody, SignupRequestBody } from "../types/user";

const signin = async (
  req: Request<{}, {}, SigninRequestBody>,
  res: Response,
) => {
  const { password, username } = req.body;

  const user = await prismaClient.user.findUnique({
    where: { username: username },
  });
  if (user === null) return res.status(401).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (match === false)
    return res.status(401).json({ message: "Wrong password" });

  const data: JwtPayload = { id: user.id };
  const token = jwt.sign(data, process.env.JWT_SECRET || "", {
    expiresIn: 86400,
  });

  return res.json(token);
};

const signup = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
) => {
  const { password, username } = req.body;

  const secret = await bcrypt.hash(password, 10);
  const user = await prismaClient.user.findUnique({
    where: { username: username },
  });

  if (user !== null)
    return res.status(400).json({ message: "User already exists" });

  await prismaClient.user.create({
    data: {
      password: secret,
      username: username,
    },
  });

  return res.status(201).json({ message: "User has been registered" });
};

export const main = {
  signin: signin,
  signup: signup,
};
