import React from 'react';
import styled from "styled-components";

const MovieGrid = styled.div`
    display: flex;
    background-color: #222;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
`;

const MovieCard = styled.div`
    max-width: 150px;
    text-align: center;
    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }
`;

const Text = styled.div`
    color: white;
    margin-top: 10px;
    font-size: 10px;
    text-align: left;
`;

const MovieList = ({ movies, onClickMovieItem }) => {
    return (
        <MovieGrid>
            {movies.map((movie) => (
                <MovieCard key={movie.id} onClick={() => onClickMovieItem(movie)}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <Text>{movie.title}</Text>
                    <Text>개봉일: {movie.release_date}</Text>
                </MovieCard>
            ))}
        </MovieGrid>
    );
};

export default MovieList;