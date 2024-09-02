"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../prisma/prisma");
const setup_1 = require("../setup");
describe("Shortener Controller", () => {
    const user = { token: "" };
    beforeEach(async () => {
        await prisma_1.prismaClient.url.deleteMany({ where: { base: setup_1.base } });
        await prisma_1.prismaClient.user.deleteMany({ where: { username: setup_1.user.username } });
    });
    it("should create a new shortened URL for an authenticated user", async () => {
        await setup_1.request.post("/user/signup").send(setup_1.user);
        const signin = await setup_1.request.post("/user/signin").send(setup_1.user);
        user.token = signin.body;
        const response = await setup_1.request
            .post("/shortener")
            .set("Authorization", `Bearer ${user.token}`)
            .send({ base: setup_1.base });
        const data = response.body;
        expect(response.status).toBe(200);
        expect(data.userId).not.toBeNull();
    });
    it("should create a new shortened URL", async () => {
        const response = await setup_1.request.post("/shortener").send({ base: setup_1.base });
        expect(response.status).toBe(200);
    });
});
