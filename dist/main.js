"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./docs/swagger");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const anchor_route_1 = require("./routes/anchor.route");
const shortener_route_1 = require("./routes/shortener.route");
const url_route_1 = require("./routes/url.route");
const user_route_1 = require("./routes/user.route");
exports.app = (0, express_1.default)();
const port = process.env.PORT || 4000;
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/api-docs", swagger_1.swaggerUiPath, swagger_1.swaggerDocs);
exports.app.use("/anchor", anchor_route_1.router);
exports.app.use("/shortener", auth_middleware_1.authenticate, shortener_route_1.router);
exports.app.use("/url", auth_middleware_1.authenticate, url_route_1.router);
exports.app.use("/user", user_route_1.router);
if (process.env.NODE_ENV !== "test")
    exports.app.listen(port, () => { });
