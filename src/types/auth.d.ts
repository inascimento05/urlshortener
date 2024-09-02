import { User } from "@prisma/client";

export interface JwtPayload {
  id: User["id"];
}
