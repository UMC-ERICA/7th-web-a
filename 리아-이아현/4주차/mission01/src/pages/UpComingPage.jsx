import MovieGrid from "../components/MovieGrid";
import useCustomFetch from "../hooks/useCustomFetch";

const UpComingPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/upcoming?language=ko-KR&page=1`);

  return <MovieGrid movies={movies} />;
};

export default UpComingPage;
