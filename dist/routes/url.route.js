"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const url_controller_1 = require("../controllers/url.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.router = (0, express_1.Router)();
// @ts-ignore
exports.router.delete("/:id", auth_middleware_1.authenticate, url_controller_1.url.remove);
exports.router.get("/", auth_middleware_1.authenticate, url_controller_1.url.all);
// @ts-ignore
exports.router.patch("/:id", auth_middleware_1.authenticate, url_controller_1.url.update);
