import { Router } from "express";
import { anchor } from "../controllers/anchor.controller";

export const router = Router();

router.get("/:id", anchor.redirect);
