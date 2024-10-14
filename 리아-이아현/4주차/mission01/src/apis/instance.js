import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_BEARER_TOKEN}`,
  },
});

export default instance;
