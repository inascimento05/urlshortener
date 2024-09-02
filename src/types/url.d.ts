import { Url } from "@prisma/client";

export interface RemoveParams {
  id: Url["id"];
}

export interface UpdateRequestBody {
  base: Url["base"];
}
