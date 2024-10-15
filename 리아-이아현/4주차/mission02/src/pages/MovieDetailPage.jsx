import { useParams } from "react-router-dom";
import IMG_BASE_URL from "../constants/path";
import useCustomFetchMovieDetail from "../hooks/useCustomFetchMovieDetail";

const MovieDetailPage = () => {
  const { movieId } = useParams(); // movieId 추출

  // 영화 상세 정보 데이터 가져오기
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

  // movieDetails가 없을 때 처리
  if (!movieDetails) {
    return <h1 style={{ color: "white" }}>영화 정보를 불러올 수 없습니다.</h1>;
  }

  const { title, poster_path, release_date, overview, vote_average, runtime } =
    movieDetails;

  return (
    <div>
      <h1>{title}</h1>
      <img src={`${IMG_BASE_URL}${poster_path}`} alt={title} />
      <p>개봉일: {release_date}</p>
      <p>평점: {vote_average}</p>
      <p>상영 시간: {runtime}분</p>
      <p>줄거리: {overview}</p>
    </div>
  );
};

export default MovieDetailPage;
