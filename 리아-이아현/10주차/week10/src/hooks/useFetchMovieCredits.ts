import { useQuery } from "@tanstack/react-query";
import instance from "../apis/instance";

const fetchMovieCredits = async <T>(url: string): Promise<T> => {
  const response = await instance.get(url);
  return response.data;
};

const useFetchMovieCredits = <T>(url: string, queryKey: string) => {
  return useQuery<T>({
    queryKey: [queryKey, url],
    queryFn: () => fetchMovieCredits<T>(url),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useFetchMovieCredits;
