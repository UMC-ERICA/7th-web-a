import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  return (
    <div>
      <p>현재 페이지의 파라미터는 {movieId} 입니다. </p>
    </div>
  );
};

export default MovieDetailPage;
