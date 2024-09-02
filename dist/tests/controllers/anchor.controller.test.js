"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../setup");
const prisma_1 = require("../../prisma/prisma");
describe("Anchor Controller", () => {
    beforeEach(async () => {
        await prisma_1.prismaClient.url.deleteMany({ where: { base: setup_1.base } });
        await prisma_1.prismaClient.user.deleteMany({ where: { username: setup_1.user.username } });
    });
    it("should redirect to the correct URL for a valid ID", async () => {
        const responseUrl = await setup_1.request.post("/shortener").send({ base: setup_1.base });
        const dataUrl = responseUrl.body;
        const response = await setup_1.request.get(`/anchor/${dataUrl.id}`);
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe(setup_1.base);
    });
    it("should return 404 for a non-existent URL ID", async () => {
        const response = await setup_1.request.get(`/anchor/wrong-id`);
        expect(response.status).toBe(404);
    });
    it("should increment the click count for a valid URL ID", async () => {
        const responseUrl = await setup_1.request.post("/shortener").send({ base: setup_1.base });
        const dataUrl = responseUrl.body;
        await setup_1.request.get(`/anchor/${dataUrl.id}`);
        const updated = await prisma_1.prismaClient.url.findUnique({
            where: { id: dataUrl.id },
        });
        const clicks = updated === null ? 0 : updated.clicks;
        expect(clicks).toBe(1);
    });
});
