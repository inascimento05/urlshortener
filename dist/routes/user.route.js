"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.router = (0, express_1.Router)();
exports.router.post("/signin", user_controller_1.main.signin);
exports.router.post("/signup", user_controller_1.main.signup);
