import { Prisma } from "@prisma/client";

export interface SigninRequestBody {
  username: Prisma.UserCreateInput["username"];
  password: Prisma.UserCreateInput["password"];
}

export interface SignupRequestBody {
  username: Prisma.UserCreateInput["username"];
  password: Prisma.UserCreateInput["password"];
}
