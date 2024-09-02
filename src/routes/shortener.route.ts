import { Router } from "express";
import { shortener } from "../controllers/shortener.controller";

export const router = Router();

router.post("/", shortener.create);
