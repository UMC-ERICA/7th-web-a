import { useParams } from "react-router-dom";
import IMG_BASE_URL from "../constants/path";
import useFetchMovieDetail from "../hooks/useFetchMovieDetail";
import useFetchMovieCredits from "../hooks/useFetchMovieCredits";
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
  width: 400px;
  height: 80%;
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
  font-size: 35px;
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
  margin-bottom: 30px;
`;

const CreditsContainer = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin: 20px 0;
`;

const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const CastItem = styled.div`
  width: 100px;
  text-align: center;
`;

const CastImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const CastName = styled.p`
  font-size: 15px;
  margin-top: 10px;
  color: white;
`;

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const {
    data: movieDetails,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useFetchMovieDetail(`/movie/${movieId}?language=ko-KR`);
  const {
    credits,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
  } = useFetchMovieCredits(`/movie/${movieId}/credits?language=ko-KR`);

  if (isDetailLoading || isCreditsLoading) {
    return (
      <div style={{ backgroundColor: "black" }}>
        <h1 style={{ color: "white" }}>로딩 중 입니다...</h1>
      </div>
    );
  }

  if (isDetailError || isCreditsError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 입니다...</h1>
      </div>
    );
  }

  if (!movieDetails || !credits) {
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
  const { cast, crew } = credits;
  const directors = crew.filter((member) => member.job === "Director");

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

        <CreditsContainer>
          <SectionTitle>감독</SectionTitle>
          {directors.map((director) => (
            <p key={director.id}>{director.name}</p>
          ))}
          <SectionTitle>출연진</SectionTitle>
          <CastList>
            {cast.slice(0, 10).map((actor) => (
              <CastItem key={actor.cast_id}>
                <CastImage
                  src={
                    actor.profile_path
                      ? `${IMG_BASE_URL}${actor.profile_path}`
                      : "이미지가 없습니다."
                  }
                  alt={actor.name}
                />
                <CastName>{actor.name}</CastName>
                <p style={{ color: "#ccc" }}>{actor.character}</p>
              </CastItem>
            ))}
          </CastList>
        </CreditsContainer>
      </MovieInfoContainer>
    </MovieDetailContainer>
  );
};

export default MovieDetailPage;
