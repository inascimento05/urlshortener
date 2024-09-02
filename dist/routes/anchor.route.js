"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const anchor_controller_1 = require("../controllers/anchor.controller");
exports.router = (0, express_1.Router)();
exports.router.get("/:id", anchor_controller_1.anchor.redirect);
