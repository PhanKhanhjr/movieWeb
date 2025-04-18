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
        const data = await movieService.getMovieDetail(id, language);
        res.status(200).json(data);
    }catch(err) {
        res.status(500).json({message: err.message,});
    }
}

export default {getPopular, getTrending, getMovieDetail};
