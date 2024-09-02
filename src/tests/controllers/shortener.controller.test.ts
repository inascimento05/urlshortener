import { Url } from "@prisma/client";
import { prismaClient } from "../../prisma/prisma";
import { base, request, user as userMock } from "../setup";

describe("Shortener Controller", () => {
  const user: { token: string } = { token: "" };

  beforeEach(async () => {
    await prismaClient.url.deleteMany({ where: { base: base } });
    await prismaClient.user.deleteMany({ where: { username: userMock.username } });
  });

  it("should create a new shortened URL for an authenticated user", async () => {
    await request.post("/user/signup").send(userMock);

    const signin = await request.post("/user/signin").send(userMock);
    user.token = signin.body;

    const response = await request
      .post("/shortener")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ base: base });
    const data: Url = response.body;

    expect(response.status).toBe(200);
    expect(data.userId).not.toBeNull();
  });

  it("should create a new shortened URL", async () => {
    const response = await request.post("/shortener").send({ base: base });

    expect(response.status).toBe(200);
  });
});
