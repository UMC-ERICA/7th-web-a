import styled from "styled-components";
import MovieGrid from "../components/MovieGrid";
import MovieSkeleton from "../components/MovieSkeleton";
import useFetchMovies from "../hooks/useFetchMovies";

const HomeContainer = styled.div`
  background-color: #222;
  color: white;
  height: 100%;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 0px 30px;
`;

const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
`;

const MovieGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
  padding: 20px;
`;

const HomePage: React.FC = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useFetchMovies("/movie/popular?language=ko-KR&page=1", [
    "popular-movies",
  ]);

  return (
    <HomeContainer>
      <Title>현재 인기 있는 영화는?</Title>
      {isLoading ? (
        <MovieGridContainer>
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </MovieGridContainer>
      ) : isError ? (
        <p>영화를 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.</p>
      ) : (
        <MovieGrid movies={movies || []} />
      )}
    </HomeContainer>
  );
};

export default HomePage;
