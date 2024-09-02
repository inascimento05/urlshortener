import { Url } from "@prisma/client";
import { prismaClient } from "../../prisma/prisma";
import { base, request, user as userMock } from "../setup";

describe("URL Controller", () => {
  const user: { token: string } = { token: "" };

  beforeEach(async () => {
    await prismaClient.url.deleteMany({ where: { base: base } });
    await prismaClient.user.deleteMany({ where: { username: userMock.username } });
  });

  it("should list all URLs for authenticated user", async () => {
    await request.post("/user/signup").send(userMock);

    const signin = await request.post("/user/signin").send(userMock);
    user.token = signin.body;

    await request
      .post("/shortener")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ base: base });

    const response = await request
      .get("/url")
      .set("Authorization", `Bearer ${user.token}`);

    expect(response.status).toBe(200);
  });

  it("should update a URL for authenticated user", async () => {
    const base0 = "https://new.com";

    await request.post("/user/signup").send(userMock);

    const signin = await request.post("/user/signin").send(userMock);
    user.token = signin.body;

    const responseShortener = await request
      .post("/shortener")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ base: base });
    const dataShortener: Url = responseShortener.body;

    const responseUrl = await request
      .patch(`/url/${dataShortener.id}`)
      .set("Authorization", `Bearer ${user.token}`)
      .send({ base: base0 });
    const dataUrl: Url = responseUrl.body;

    expect(responseUrl.status).toBe(200);
    expect(dataUrl.base).toBe(base0);
  });

  it("should delete a URL for authenticated user", async () => {
    await request.post("/user/signup").send(userMock);

    const signin = await request.post("/user/signin").send(userMock);
    user.token = signin.body;

    const responseShortener = await request
      .post("/shortener")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ base: base });
    const dataShortener: Url = responseShortener.body;

    const responseUrl = await request
      .delete(`/url/${dataShortener.id}`)
      .set("Authorization", `Bearer ${user.token}`);
    const dataUrl: Url = responseUrl.body;

    expect(responseUrl.status).toBe(200);
    expect(dataUrl.inactive).not.toBeNull();
  });
});
