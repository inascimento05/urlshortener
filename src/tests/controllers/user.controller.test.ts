import { prismaClient } from "../../prisma/prisma";
import { base, request, user } from "../setup";

describe("User Controller", () => {
  beforeEach(async () => {
    await prismaClient.url.deleteMany({ where: { base: base } });
    await prismaClient.user.deleteMany({ where: { username: user.username } });
  });

  it("should signup a new user", async () => {
    const response = await request.post("/user/signup").send(user);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User has been registered");
  });

  it("should signin an existing user", async () => {
    await request.post("/user/signup").send(user);

    const response = await request.post("/user/signin").send(user);

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("string");
    expect(response.body).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\./);
  });

  it("should return error for incorrect password", async () => {
    await request.post("/user/signup").send(user);

    const response = await request
      .post("/user/signin")
      .send({ username: user.username, password: "wrong-password" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Wrong password");
  });
});