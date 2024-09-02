"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortener = void 0;
const uuid_1 = require("uuid");
const prisma_1 = require("../prisma/prisma");
const create = async (req, res) => {
    const { base } = req.body;
    // @ts-ignore
    const user = req.user;
    const id = (0, uuid_1.v4)().slice(0, 6);
    const port = process.env.PORT || 3000;
    const response = await prisma_1.prismaClient.url.create({
        data: {
            base: base,
            id: id,
            shortened: `http://localhost:${port}/anchor/${id}`,
            userId: user?.id,
        },
    });
    return res.json(response.shortened);
};
exports.shortener = {
    create: create,
};
