import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { swaggerDocs, swaggerUiPath } from "./docs/swagger";
import { authenticate } from "./middlewares/auth.middleware";
import { router as anchor } from "./routes/anchor.route";
import { router as shortener } from "./routes/shortener.route";
import { router as url } from "./routes/url.route";
import { router as signup } from "./routes/user.route";

export const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUiPath, swaggerDocs);
app.use("/anchor", anchor);
app.use("/shortener", authenticate, shortener);
app.use("/url", authenticate, url);
app.use("/user", signup);

if (process.env.NODE_ENV !== "test") app.listen(port, () => {});
