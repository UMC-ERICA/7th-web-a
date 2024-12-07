import styled from "styled-components";
import MovieDetail from "./MovieDetail";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
};

type MovieGridProps = {
  movies: Movie[];
};

const MovieGridStyle = styled.div`
  background-color: black;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
  width: 100%;
  height: 100%;
  grid-auto-rows: 1fr;
  padding: 0 5px;
`;

const MovieGrid = ({ movies }: MovieGridProps) => {
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
