import express from "express";
import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";
import { isLoggedIn } from "../middleware/auth.js";
const router = express.Router();

router.post("/create", isLoggedIn, createProject);
router.get("/", isLoggedIn, getProjects);
export default router;
