import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../apis/AxiosInstance.jsx";
import styled from "styled-components";

const MovieDetailContainer = styled.div`
    flex-direction: column;
    display: flex;
    background-color: #222;
    color: white;
`;

const MoviePoster = styled.img`
    width: 300px;
    border-radius: 10px;
    margin-right: 20px;
`;

const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CreditsContainer = styled.div`
    margin-top: 20px;
`;

const LoadingText = styled.div`
    color: black;
    margin-top: 10px;
    font-size: 90px;
    text-align: center;
    justify-content: center;
    align-content: center;
    height: 60vh;
`;

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(`/movie/${movieId}?language=ko-KR&append_to_response=credits`);
                setMovieDetail(response.data);
            } catch (error) {
                console.error("영화 상세 정보를 가져오는 중 에러가 발생했습니다:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieDetail();
    }, [movieId]);

    if (isLoading) {
        return <LoadingText>로딩 중 입니다. 잠시만 기다려주세요.</LoadingText>;
    }

    if (isError || !movieDetail) {
        return <div>영화 데이터를 불러오는데 오류가 발생했습니다.</div>;
    }

    const director = movieDetail.credits.crew.find((member) => member.job === "Director");

    return (
        <MovieDetailContainer>
            <MoviePoster src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`} alt={movieDetail.title} />
            <MovieInfo>
                <h1>{movieDetail.title}</h1>
                <p>{movieDetail.overview}</p>
                <p>개봉일: {movieDetail.release_date}</p>
                <p>평점: {movieDetail.vote_average}</p>
                <p>감독: {director ? director.name : '정보 없음'}</p>
                <CreditsContainer>
                    <h3>출연진</h3>
                    <ul>
                        {movieDetail.credits.cast.slice(0, 20).map((castMember) => (
                            <li key={castMember.cast_id}>
                                {castMember.name} ({castMember.character})
                            </li>
                        ))}
                    </ul>
                </CreditsContainer>
            </MovieInfo>
        </MovieDetailContainer>
    );
};

export default MovieDetailPage;
