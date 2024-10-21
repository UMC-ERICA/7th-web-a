import styled from 'styled-components';
import MovieItem from './MovieItem';

const MoviesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    gap: 30px;
    padding: 10px;
`;

const MoviesList = ({ movies, onMovieClick }) => {
    return (
        <MoviesContainer>
            {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} onClick={onMovieClick} />
            ))}
        </MoviesContainer>
    );
};

export default MoviesList;
