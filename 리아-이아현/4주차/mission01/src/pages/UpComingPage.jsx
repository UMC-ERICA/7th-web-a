import MovieGrid from "../components/MovieGrid";
import useCustomFetch from "../hooks/useCustomFetch";

const UpComingPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/upcoming?language=ko-KR&page=1`);

  if (isLoading && movies.length === 0) {
    return (
      <div style={{ backgroundColor: "black" }}>
        <h1 style={{ color: "white" }}>로딩 중 입니다...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 입니다...</h1>
      </div>
    );
  }

  return <MovieGrid movies={movies} />;
};

export default UpComingPage;
