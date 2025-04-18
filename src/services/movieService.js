import tmdbAPI from "../utils/tmdbAPI.js";

const getPopularMovie = async(page = 1 ) => {
    const response = await tmdbAPI.get("/movie/popular", {
        params: {page}
    });
    return response.data;
}

const getTrendingMovie = async(page = 1 ) => {
    const response = await tmdbAPI.get("/trending/movie/day", {
        params: {page}
    });
    return response.data;
}

const getMovieDetail = async(movieId, language = 'en-US') => {
    const response = await tmdbAPI.get(`/movie/${movieId}`, {
        params: {
            language,
            append_to_response: 'credits,videos,images,recommendations'
        }
    });
    return response.data;
}

export default {getPopularMovie, getTrendingMovie, getMovieDetail}