import { Router } from "express";
import {
  login,
  logout,
  verifyToken,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);

export default router;