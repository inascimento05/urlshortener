"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../prisma/prisma");
const setup_1 = require("../setup");
describe("URL Controller", () => {
    const user = { token: "" };
    beforeEach(async () => {
        await prisma_1.prismaClient.url.deleteMany({ where: { base: setup_1.base } });
        await prisma_1.prismaClient.user.deleteMany({ where: { username: setup_1.user.username } });
    });
    it("should list all URLs for authenticated user", async () => {
        await setup_1.request.post("/user/signup").send(setup_1.user);
        const signin = await setup_1.request.post("/user/signin").send(setup_1.user);
        user.token = signin.body;
        await setup_1.request
            .post("/shortener")
            .set("Authorization", `Bearer ${user.token}`)
            .send({ base: setup_1.base });
        const response = await setup_1.request
            .get("/url")
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.status).toBe(200);
    });
    it("should update a URL for authenticated user", async () => {
        const base0 = "https://new.com";
        await setup_1.request.post("/user/signup").send(setup_1.user);
        const signin = await setup_1.request.post("/user/signin").send(setup_1.user);
        user.token = signin.body;
        const responseShortener = await setup_1.request
            .post("/shortener")
            .set("Authorization", `Bearer ${user.token}`)
            .send({ base: setup_1.base });
        const dataShortener = responseShortener.body;
        const responseUrl = await setup_1.request
            .patch(`/url/${dataShortener.id}`)
            .set("Authorization", `Bearer ${user.token}`)
            .send({ base: base0 });
        const dataUrl = responseUrl.body;
        expect(responseUrl.status).toBe(200);
        expect(dataUrl.base).toBe(base0);
    });
    it("should delete a URL for authenticated user", async () => {
        await setup_1.request.post("/user/signup").send(setup_1.user);
        const signin = await setup_1.request.post("/user/signin").send(setup_1.user);
        user.token = signin.body;
        const responseShortener = await setup_1.request
            .post("/shortener")
            .set("Authorization", `Bearer ${user.token}`)
            .send({ base: setup_1.base });
        const dataShortener = responseShortener.body;
        const responseUrl = await setup_1.request
            .delete(`/url/${dataShortener.id}`)
            .set("Authorization", `Bearer ${user.token}`);
        const dataUrl = responseUrl.body;
        expect(responseUrl.status).toBe(200);
        expect(dataUrl.inactive).not.toBeNull();
    });
});
