import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import yaml from "yaml";

const file = fs.readFileSync(path.join(__dirname, "docs.yaml"), "utf8");
const swaggerDocument = yaml.parse(file);

export const swaggerDocs = swaggerUi.setup(swaggerDocument);
export const swaggerUiPath = swaggerUi.serve;
