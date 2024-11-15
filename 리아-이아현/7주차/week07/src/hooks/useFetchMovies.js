import { useQuery } from "@tanstack/react-query";
import instance from "../apis/instance";

const fetchMovies = async (url) => {
  const response = await instance.get(url);
  return response.data.results;
};

const useFetchMovies = (url, queryKey) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchMovies(url),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useFetchMovies;
