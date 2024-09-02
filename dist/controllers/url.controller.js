"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const prisma_1 = require("../prisma/prisma");
const all = async (req, res, next) => {
    // @ts-ignore
    const user = req.user;
    if (user === undefined)
        res.status(401).json({ message: "Unauthorized user" });
    const urls = await prisma_1.prismaClient.url.findMany({
        where: { inactive: null, userId: user?.id },
    });
    return res.json(urls);
};
const remove = async (req, res, next) => {
    // @ts-ignore
    const user = req.user;
    if (user === undefined)
        return res.status(401).json({ message: "Unauthorized user" });
    const url = await prisma_1.prismaClient.url.findUnique({
        where: { id: req.params.id },
    });
    if (url === null)
        return res.status(404).json({ message: "URL not found" });
    if (url.userId !== user.id)
        return res.status(401).json({ message: "Unauthorized user" });
    const update = await prisma_1.prismaClient.url.update({
        data: { inactive: new Date() },
        where: {
            id: req.params.id,
            userId: user.id,
        },
    });
    return res.status(200).json(update);
};
const update = async (req, res, next) => {
    // @ts-ignore
    const user = req.user;
    if (user === undefined)
        return res.status(401).json({ message: "Unauthorized user" });
    const url = await prisma_1.prismaClient.url.findUnique({
        where: { id: req.params.id },
    });
    if (url === null)
        return res.status(404).json({ message: "URL not found" });
    if (url.userId !== user.id)
        return res.status(401).json({ message: "Unauthorized user" });
    const update = await prisma_1.prismaClient.url.update({
        data: { base: req.body.base },
        where: {
            id: req.params.id,
            userId: user.id,
        },
    });
    return res.status(200).json(update);
};
exports.url = {
    all: all,
    remove: remove,
    update: update,
};
