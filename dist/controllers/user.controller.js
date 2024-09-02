"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../prisma/prisma");
const signin = async (req, res) => {
    const { password, username } = req.body;
    const user = await prisma_1.prismaClient.user.findUnique({
        where: { username: username },
    });
    if (user === null)
        return res.status(401).json({ message: "User not found" });
    const match = await bcrypt_1.default.compare(password, user.password);
    if (match === false)
        return res.status(401).json({ message: "Wrong password" });
    const data = { id: user.id };
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET || "", {
        expiresIn: 86400,
    });
    return res.json(token);
};
const signup = async (req, res) => {
    const { password, username } = req.body;
    const secret = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.prismaClient.user.findUnique({
        where: { username: username },
    });
    if (user !== null)
        return res.status(400).json({ message: "User already exists" });
    await prisma_1.prismaClient.user.create({
        data: {
            password: secret,
            username: username,
        },
    });
    return res.status(201).json({ message: "User has been registered" });
};
exports.main = {
    signin: signin,
    signup: signup,
};
