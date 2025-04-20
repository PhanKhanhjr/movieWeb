
import movieService from '../services/movieService.js';

const getPopular = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await movieService.getPopularMovie(page);
        res.status(200).json(data);
    }catch(err) {
        res.status(500).json({message: err.message,});
    }
}

const getTrending = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await movieService.getTrendingMovie(page);
        res.status(200).json(data);
    }catch(err) {
        res.status(500).json({message: err.message,});
    }
}

const getMovieDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const language = req.query.language || 'en-US';
        const data = await movieService.getMovieDetails(id, language);
        res.status(200).json(data);
    }catch(err) {
        res.status(500).json({message: err.message,});
    }
}

const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await movieService.getVideo(id)
        res.status(200).json(response);
    }catch(err) {
        res.status(500).json({message: err.message,});
    }
}

const getUpcomingMovie = async (req, res) => {
    try {
        const response = await movieService.getUpcomingMovie();
        res.status(200).json(response);
    }
    catch(err) {
        res.status(500).json({message: err.message,});
    }
}

const getMovieCredits = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await movieService.getMovieCredits(id);
        res.status(200).json(response);
    }catch(err) {
        res.status(500).json({message: err.message,});
    }
}
const searchMovies = async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
        const data = await movieService.searchMovies(query, page);
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

export default {getPopular, getTrending, getMovieDetail, getMovie, getUpcomingMovie, getMovieCredits, searchMovies};
