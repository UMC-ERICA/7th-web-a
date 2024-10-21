import styled from 'styled-components';

const MoviesItem = styled.div`
    width: 170px;
    text-align: center;
    border-radius: 8px;
    margin: 10px;
`;

const MovieImage = styled.img`
    width: 170px;
    height: auto;
    border-radius: 8px;

    &:hover {
        filter: brightness(0.5);
        transform: scale(1.05);
    }
`;

const MovieItem = ({ movie, onClick }) => {
    return (
        <MoviesItem>
            <MovieImage
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={() => onClick(movie.id)}
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </MoviesItem>
    );
};

export default MovieItem;
