import axiosInstance from "../../apis/axios-instance";

const useGetMovies = async ({ category, pageParam }) => {
    const { data } = await axiosInstance.get(`movie/${category}?language=ko-KR&page=${pageParam}`);
    return data;
};

const fetchMovieData = async (movieId) => {
    const { data } = await axiosInstance.get(`/movie/${movieId}?language=ko-KR`);
    return data;
};

const fetchCreditsData = async (movieId) => {
    const { data } = await axiosInstance.get(`/movie/${movieId}/credits?language=ko-KR`);
    return data;
};

export { useGetMovies, fetchMovieData, fetchCreditsData };