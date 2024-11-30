import { useQuery } from "@tanstack/react-query";
import { useGetMovies } from "./useGetMovies";

function useGetPaginatedMovies(category, page) {
    return useQuery({
        queryKey: ['movies', category, page],
        queryFn: () => useGetMovies({ category, pageParam: page }),
        keepPreviousData: true,
        select: (data) => ({
            ...data,
            hasNextPage: data.page < data.total_pages
        }),
    });
}

export { useGetPaginatedMovies };
