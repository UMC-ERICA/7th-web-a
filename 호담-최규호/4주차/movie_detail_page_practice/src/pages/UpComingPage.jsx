import styled from "styled-components";
import useRecycleState from "../hooks/useRecycleState.jsx";
import { useNavigate } from 'react-router-dom';

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

const LoadingText = styled.div`
    color: black;
    margin-top: 10px;
    font-size: 900px;
    text-align: center;
    justify-content: center;
    align-content: center;
    height: 60vh;
`;

const UpComingPage = () => {
    const {data2: movies, isLoading, isError} = useRecycleState(`/movie/upcoming?language=ko-KR&page=1`)
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
export default UpComingPage;

