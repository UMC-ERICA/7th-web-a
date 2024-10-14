import MovieGrid from "../components/MovieGrid";
import useCustomFetch from "../hooks/useCustomFetch";

const TopRatedPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/top_rated?language=ko-KR&page=1`);

  return <MovieGrid movies={movies} />;
};

export default TopRatedPage;
