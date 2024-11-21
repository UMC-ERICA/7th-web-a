import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_TODO_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 데이터를 자동으로 추출
axiosInstance.interceptors.response.use((response) => {
  return response.data[0];
});

export default axiosInstance;