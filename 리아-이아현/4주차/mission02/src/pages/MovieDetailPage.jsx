import { useParams } from "react-router-dom";
import IMG_BASE_URL from "../constants/path";
import useCustomFetchMovieDetail from "../hooks/useCustomFetchMovieDetail";
import styled from "styled-components";

const MovieDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: black;
  color: white;
  padding: 50px;
  height: 100vh;
  width: 100%;
  gap: 20px;
`;

const MoviePoster = styled.img`
  width: 300px;
  height: 350px;
  border-radius: 15px;
  object-fit: cover;
  margin: 0 20px;
`;

const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`;

const MovieTitle = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  margin-bottom: 5px;
`;

const MovieTagline = styled.div`
  font-style: italic;
  font-weight: bold;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const MovieOverview = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const {
    data: movieDetails,
    isLoading,
    isError,
  } = useCustomFetchMovieDetail(`/movie/${movieId}?language=ko-KR`);

  if (isLoading) {
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

  if (!movieDetails) {
    return <h1 style={{ color: "white" }}>영화 정보를 불러올 수 없습니다.</h1>;
  }

  const {
    title,
    poster_path,
    release_date,
    overview,
    vote_average,
    runtime,
    tagline,
  } = movieDetails;

  return (
    <MovieDetailContainer>
      <MoviePoster src={`${IMG_BASE_URL}${poster_path}`} alt={title} />
      <MovieInfoContainer>
        <MovieTitle>{title}</MovieTitle>
        <MovieInfo>개봉일: {release_date}</MovieInfo>
        <MovieInfo>평균: {vote_average}</MovieInfo>
        <MovieInfo>상영 시간: {runtime}분</MovieInfo>
        <MovieTagline>{tagline}</MovieTagline>
        <MovieOverview>{overview}</MovieOverview>
      </MovieInfoContainer>
    </MovieDetailContainer>
  );
};

export default MovieDetailPage;
