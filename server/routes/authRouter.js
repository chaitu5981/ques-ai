import { Router } from "express";
import { checkAuth, login, register } from "../controllers/authController.js";
import { isLoggedIn } from "../middleware/auth.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", isLoggedIn, checkAuth);

export default router;
