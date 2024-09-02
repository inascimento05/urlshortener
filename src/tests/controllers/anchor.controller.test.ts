import { Url } from "@prisma/client";
import { base, request, user } from "../setup";
import { prismaClient } from "../../prisma/prisma";

describe("Anchor Controller", () => {
  beforeEach(async () => {
    await prismaClient.url.deleteMany({ where: { base: base } });
    await prismaClient.user.deleteMany({ where: { username: user.username } });
  });

  it("should redirect to the correct URL for a valid ID", async () => {
    const responseUrl = await request.post("/shortener").send({ base: base });
    const dataUrl: Url = responseUrl.body;
    const response = await request.get(`/anchor/${dataUrl.id}`);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(base);
  });

  it("should return 404 for a non-existent URL ID", async () => {
    const response = await request.get(`/anchor/wrong-id`);

    expect(response.status).toBe(404);
  });

  it("should increment the click count for a valid URL ID", async () => {
    const responseUrl = await request.post("/shortener").send({ base: base });
    const dataUrl: Url = responseUrl.body;

    await request.get(`/anchor/${dataUrl.id}`);

    const updated = await prismaClient.url.findUnique({
      where: { id: dataUrl.id },
    });
    const clicks = updated === null ? 0 : updated.clicks;

    expect(clicks).toBe(1);
  });
});
