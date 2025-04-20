import express from "express";
import movieController from "../controllers/movieController.js";
const router = express.Router();

router.get("/api/v1/popular", movieController.getPopular)
router.get("/api/v1/trending", movieController.getTrending)
router.get("/api/v1/detail/:id", movieController.getMovieDetail)
router.get("/api/v1/movie/:id", movieController.getMovie)
router.get("/api/v1/upcoming", movieController.getUpcomingMovie)
router.get("/api/v1/movie/:id/credits", movieController.getMovieCredits)
router.get('/api/v1/search', movieController.searchMovies);

export default router;