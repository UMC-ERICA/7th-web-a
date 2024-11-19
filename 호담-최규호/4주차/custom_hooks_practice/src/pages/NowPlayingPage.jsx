import { useEffect, useState } from "react";
import axiosInstance from "../apis/AxiosInstance.jsx";
import styled from "styled-components";
import useRecycleState from "../hooks/useRecycleState.jsx";

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

const PlayingPage = () => {
    const {data2: movies, isLoading, isError} = useRecycleState(`/movie/now_playing?language=ko-KR&page=1`)

    if (isLoading) {
        return <div>로딩 중 입니다...</div>
    }

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

export default PlayingPage;

