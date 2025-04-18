import tmdbAPI from "../utils/tmdbAPI.js";
import axios from "axios";
import * as cheerio from 'cheerio';


const getPopularMovie = async(page = 1 ) => {
    const response = await tmdbAPI.get("/movie/popular?&language=vi-VN", {
        params: {page}
    });
    return response.data;
}
const getTrendingMovie = async(page = 1 ) => {
    const response = await tmdbAPI.get("/trending/movie/day?&language=vi-VN", {
        params: {page}
    });
    return response.data;
}

const getUpcomingMovie = async(page = 1 ) => {
    const response = await tmdbAPI.get("/movie/upcoming?&language=vi-VN", {
        params: {page}
    });
    return response.data;
}

const getMovieDetails = async(id) => {
    const response = await tmdbAPI.get(`/movie/${id}?language=vi-VN`, {
    });
    return response.data;
}

const getVideo = async (id) => {
    const baseURL = process.env.VIDSRC_URL_BASE;
    const response = await axios.get(`${baseURL}${id}`);
    const $ = cheerio.load(response.data);
    const iframeSrc = $('#player_iframe').attr('src');
    return iframeSrc;
};

export default {getPopularMovie, getTrendingMovie, getUpcomingMovie, getMovieDetails, getVideo}