import React from "react";
import styled from "styled-components";
import Playing from "../img/movie1.jpg";
import Popular from "../img/movie2.jpg";
import TopRated from "../img/movie3.jpg";
import UpComing from "../img/movie4.jpg";
import { Link } from "react-router-dom";

const TotalPage = styled.div`
  background-color: #222;
  color: white;
  min-height: 100vh;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 0px 30px;
`;

const CategoryContainer = styled.div`
  background-color: #222;
  color: white;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
`;

const PublicMovieButton = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
`;

const MovieLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  img {
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
  padding: 10px;
`;

const MovieText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
`;

const MoviePage = () => {
    return (
        <TotalPage>
            <CategoryContainer>
                <h3>카테고리</h3>
            </CategoryContainer>
            <PublicMovieButton>
                <MovieLink to = "/movie/playing">
                    <img src = {Playing} alt = "현재 상영중인"></img>
                    <MovieText>현재 상영중인</MovieText>
                </MovieLink>
                <MovieLink to = "/movie/popular">
                    <img src = {Popular} alt = "인기있는"></img>
                    <MovieText>인기있는</MovieText>
                </MovieLink>
                <MovieLink to = "/movie/top_rated">
                    <img src = {TopRated} alt = "높은 평가를 받은"></img>
                    <MovieText>높은 평가를 받은</MovieText>
                </MovieLink>
                <MovieLink to = "/movie/up_coming">
                    <img src = {UpComing} alt = "개봉 예정중인"></img>
                    <MovieText>개봉 예정중인</MovieText>
                </MovieLink>
            </PublicMovieButton>
        </TotalPage>
    )
}

export default MoviePage;