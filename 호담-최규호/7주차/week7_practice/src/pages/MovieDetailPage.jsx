import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/AxiosInstance.jsx";
import styled from "styled-components";
import SkeletonList from '../components/Skeleton/SkeletonList.jsx';

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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
  background-color: #222;
`;

const MovieGridContainer = styled.div`
  margin=top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`

const fetchMovieDetail = async (movieId) => {
    const response = await axiosInstance.get(`/movie/${movieId}?language=ko-KR&append_to_response=credits`);
    return response.data;
};

const MovieDetailPage = () => {
    const { movieId } = useParams();

    const { data: movieDetail, isPending, isError } = useQuery({
        queryKey: ['movieDetail', movieId],
        queryFn: () => fetchMovieDetail(movieId),
        staleTime: 10000,
        cacheTime: 10000,
    });

    if (isPending) {
        return (
          <PageContainer>
            <MovieGridContainer>
              <SkeletonList number={20}/>
            </MovieGridContainer>
          </PageContainer>
        );
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
