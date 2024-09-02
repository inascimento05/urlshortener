"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = async (req, res, next) => {
    const authorization = req.headers["authorization"] === undefined ?
        ""
        : req.headers["authorization"];
    const token = authorization.replace("Bearer ", "");
    // @ts-ignore
    if (token === "")
        req.user = undefined;
    // @ts-ignore
    else
        req.user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
    return next();
};
exports.authenticate = authenticate;
