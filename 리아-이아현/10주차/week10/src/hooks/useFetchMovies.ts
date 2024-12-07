import { useQuery, QueryKey } from "@tanstack/react-query";
import instance from "../apis/instance";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

const fetchMovies = async (url: string): Promise<Movie[]> => {
  const response = await instance.get(url);
  return response.data.results;
};

const useFetchMovies = (url: string, queryKey: QueryKey) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchMovies(url),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useFetchMovies;
