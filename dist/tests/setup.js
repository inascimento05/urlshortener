"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.request = exports.base = void 0;
const supertest_1 = __importDefault(require("supertest"));
const main_1 = require("../main");
exports.base = "https://example.com";
exports.request = (0, supertest_1.default)(main_1.app);
exports.user = { username: "test-user", password: "test-password" };
