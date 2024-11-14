import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../apis/AxiosInstance";

const useGetPaginationMovies = ({ category, page }) => {
    return useQuery({
        queryFn: () => fetchMoviesByPage({ category, page }),
        queryKey: ['movies', category, page],
        keepPreviousData: true,  // 페이지 이동 시 이전 데이터 유지
    });
};

const fetchMoviesByPage = async ({ category, page }) => {
    const { data } = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${page}`);
    return data;
};

export { useGetPaginationMovies };
