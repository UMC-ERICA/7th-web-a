import styled from "styled-components";
import MovieDetail from "./MovieDetail";

const MovieGridStyle = styled.div`
  background-color: black;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
  padding: 20px;
  width: 100%;
  height: 100%;
  grid-auto-rows: 1fr;
`;

const MovieGrid = ({ movies }) => {
  return (
    <MovieGridStyle>
      {movies.map((movie) => (
        <MovieDetail
          key={movie.id}
          movieId={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
          release_date={movie.release_date}
        />
      ))}
    </MovieGridStyle>
  );
};

export default MovieGrid;
