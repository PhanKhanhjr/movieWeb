import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const tmdbAPI = axios.create({
    baseURL: process.env.TMDB_URL_BASE,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
});
export default tmdbAPI;
