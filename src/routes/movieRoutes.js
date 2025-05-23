import express from "express";
import movieController from "../controllers/movieController.js";
const router = express.Router();

router.get("/api/v1/popular", movieController.getPopular)
router.get("/api/v1/trending", movieController.getTrending)
router.get("/api/v1/movie/:id", movieController.getMovieDetail)

export default router;