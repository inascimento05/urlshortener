"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiPath = exports.swaggerDocs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yaml_1 = __importDefault(require("yaml"));
const file = fs_1.default.readFileSync(path_1.default.join(__dirname, "docs.yaml"), "utf8");
const swaggerDocument = yaml_1.default.parse(file);
exports.swaggerDocs = swagger_ui_express_1.default.setup(swaggerDocument);
exports.swaggerUiPath = swagger_ui_express_1.default.serve;
