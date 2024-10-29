import styled from "styled-components";
import useRecycleState from "../hooks/useRecycleState.jsx";
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';

const LoadingText = styled.div`
    color: black;
    margin-top: 10px;
    font-size: 90px;
    text-align: center;
    justify-content: center;
    align-content: center;
    height: 60vh;
`;

const PlayingPage = () => {
    const {data2: movies, isLoading, isError} = useRecycleState(`/movie/now_playing?language=ko-KR&page=1`)
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingText>로딩 중 입니다. 잠시만 기다려주세요.</LoadingText>
    }

    const onClickMovieItem = (movie) => {
        navigate(`/movie/${movie.id}`, {
            state: movie,
        });
    };

    return (
        <MovieList movies={movies} onClickMovieItem={onClickMovieItem} />
    );
};

export default PlayingPage;