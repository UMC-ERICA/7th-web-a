import { useQuery } from "@tanstack/react-query";
import instance from "../apis/instance";

const fetchMovieCredits = async (url) => {
  const response = await instance.get(url);
  return response.data;
};

const useFetchMovieCredits = (url, queryKey) => {
  return useQuery({
    queryKey: [queryKey, url],
    queryFn: () => fetchMovieCredits(url),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useFetchMovieCredits;
