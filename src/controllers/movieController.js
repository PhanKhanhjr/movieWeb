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
export default {getPopular};