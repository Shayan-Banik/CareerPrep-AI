import { Router } from "express";
import {
  login,
  register,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getMe", authMiddleware, getMe);

export default router;
