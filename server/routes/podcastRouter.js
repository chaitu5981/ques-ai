import express from "express";
import { isLoggedIn } from "../middleware/auth.js";
import {
  createPodcast,
  deletePodcast,
  getPodcast,
  getPodcasts,
  updatePodcast,
} from "../controllers/podcastController.js";
const router = express.Router();
router.post("/create", isLoggedIn, createPodcast);
router.get("/all/:projectId", isLoggedIn, getPodcasts);
router.post("/update", isLoggedIn, updatePodcast);
router.delete("/:podcastId/:projectId", isLoggedIn, deletePodcast);
router.get("/:podcastId", isLoggedIn, getPodcast);
export default router;
