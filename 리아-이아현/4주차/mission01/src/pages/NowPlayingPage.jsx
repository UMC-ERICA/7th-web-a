import MovieGrid from "../components/MovieGrid";
import useCustomFetch from "../hooks/useCustomFetch";

const NowPlayingPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/now_playing?language=ko-KR&page=1`);

  return <MovieGrid movies={movies} />;
};

export default NowPlayingPage;
