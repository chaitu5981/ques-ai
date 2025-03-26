import express from "express";
import { isLoggedIn } from "../middleware/auth.js";
import {
  createPodcast,
  getPodcasts,
} from "../controllers/podcastController.js";
const router = express.Router();
router.post("/create", isLoggedIn, createPodcast);
router.get("/:projectId", isLoggedIn, getPodcasts);
export default router;
