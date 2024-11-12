import MovieGrid from "../components/MovieGrid";
import MovieSkeleton from "../components/MovieSkeleton";
import useFetchMovies from "../hooks/useFetchMovies";

const TopRatedPage = () => {
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useFetchMovies(`/movie/top_rated?language=ko-KR&page=1`, 'top-rated');

  if (isLoading) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "25px",
          padding: "20px",
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1>에러가 발생했습니다. 다시 시도해주세요.</h1>
      </div>
    );
  }

  return <MovieGrid movies={movies} />;
};

export default TopRatedPage;
