"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const shortener_controller_1 = require("../controllers/shortener.controller");
exports.router = (0, express_1.Router)();
exports.router.post("/", shortener_controller_1.shortener.create);
