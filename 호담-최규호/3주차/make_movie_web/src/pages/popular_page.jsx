import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const MovieGrid = styled.div`
    display: flex;
    background-color: #222;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    width: 100%;
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

const PopularPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzU5N2VhY2UwYzNiMzQ0MGRmY2IwZTU2NjAzMjdkMyIsIm5iZiI6MTcyODc5MjY2MC42Nzg2NjgsInN1YiI6IjY3MGE4MDYzYmJiMWE5ZTgxYzYxODg5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HnDwLNtgrIh_1RgDhoF7Lb6v5YX3QVFhqY1UeaUoy_s`
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error("오류 발생", error);
            }
        };
        getMovies();
    }, []);

    return (
        <MovieGrid>
            {movies.map((movie) => (
                <MovieCard key={movie.id}>
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

export default PopularPage;

