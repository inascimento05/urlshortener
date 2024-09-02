import supertest from "supertest";
import { prismaClient } from "../prisma/prisma";
import { SigninRequestBody } from "../types/user";
import { app } from "../main";

export type User = {
  password: SigninRequestBody['password'];
  username: SigninRequestBody['username']
};

export const base = "https://example.com";
export const request = supertest(app);
export const user: User = { username: "test-user", password: "test-password" };