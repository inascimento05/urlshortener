import { Router } from "express";
import { main } from "../controllers/user.controller";

export const router = Router();

router.post("/signin", main.signin);
router.post("/signup", main.signup);
