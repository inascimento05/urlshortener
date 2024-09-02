import { Router } from "express";
import { url } from "../controllers/url.controller";
import { authenticate } from "../middlewares/auth.middleware";

export const router = Router();

// @ts-ignore
router.delete("/:id", authenticate, url.remove);
router.get("/", authenticate, url.all);
// @ts-ignore
router.patch("/:id", authenticate, url.update);
