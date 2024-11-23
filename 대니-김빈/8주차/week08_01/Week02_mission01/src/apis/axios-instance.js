import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_TODO_API_URL,
});

axiosInstance.interceptors.response.use((response) => {
  return response.data;
});

export default axiosInstance;