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

export default {getPopularMovie, getTrendingMovie}