import { Prisma } from "@prisma/client";

export interface CreateRequestBody {
  base: Prisma.UrlCreateInput["base"];
}
