import { useQuery } from "@tanstack/react-query";
import instance from "../apis/instance";

const fetchMovieDetail = async (url) => {
  const response = await instance.get(url);
  return response.data;
};

const useFetchMovieDetail = (url, queryKey) => {
  return useQuery({
    queryKey: [queryKey, url],
    queryFn: () => fetchMovieDetail(url),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useFetchMovieDetail;

