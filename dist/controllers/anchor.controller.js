"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anchor = void 0;
const prisma_1 = require("../prisma/prisma");
const redirect = async (req, res) => {
    const id = req.params.id;
    const url = await prisma_1.prismaClient.url.findUnique({ where: { id: id } });
    if (url === null)
        return res.status(404).send("URL not found");
    await prisma_1.prismaClient.url.update({
        data: { clicks: { increment: 1 } },
        where: { id: id },
    });
    res.redirect(url.base);
};
exports.anchor = {
    redirect: redirect,
};
