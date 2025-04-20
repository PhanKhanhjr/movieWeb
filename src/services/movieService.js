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

const getMovieCredits = async (id) => {
    const response = await tmdbAPI.get(`/movie/${id}/credits?language=vi-VN`);
    return response.data;
}
const searchMovies = async (query, page = 1) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL_BASE}/search/multi`, {
            headers: {
                'Authorization': `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            },
            params: {
                query,
                language: 'vi-VN',
                include_adult: false,
                page
            }
        });

        const results = response.data.results
            .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
            .map(item => ({
                id: item.id,
                title: item.title || item.name || '',
                original_title: item.title || item.name || '',
                poster_path: item.poster_path,
                backdrop_path: null,
                release_date: item.release_date || item.first_air_date || '',
                media_type: item.media_type,
                overview: ''
            }));

        return { results };
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {getPopularMovie, getTrendingMovie, getUpcomingMovie, getMovieDetails, getVideo, getMovieCredits, searchMovies}