import MovieGrid from "../components/MovieGrid";
import useCustomFetch from "../hooks/useCustomFetch";

const PopularPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/popular?language=ko-KR&page=1`);

  return <MovieGrid movies={movies} />;
};

export default PopularPage;
