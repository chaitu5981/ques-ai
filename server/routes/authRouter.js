import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middleware/auth.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", isLoggedIn, checkAuth);
router.get("/logout", isLoggedIn, logout);

export default router;
