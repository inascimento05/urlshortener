"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../prisma/prisma");
const setup_1 = require("../setup");
describe("User Controller", () => {
    beforeEach(async () => {
        await prisma_1.prismaClient.url.deleteMany({ where: { base: setup_1.base } });
        await prisma_1.prismaClient.user.deleteMany({ where: { username: setup_1.user.username } });
    });
    it("should signup a new user", async () => {
        const response = await setup_1.request.post("/user/signup").send(setup_1.user);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User has been registered");
    });
    it("should signin an existing user", async () => {
        await setup_1.request.post("/user/signup").send(setup_1.user);
        const response = await setup_1.request.post("/user/signin").send(setup_1.user);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("string");
        expect(response.body).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\./);
    });
    it("should return error for incorrect password", async () => {
        await setup_1.request.post("/user/signup").send(setup_1.user);
        const response = await setup_1.request
            .post("/user/signin")
            .send({ username: setup_1.user.username, password: "wrong-password" });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Wrong password");
    });
});
