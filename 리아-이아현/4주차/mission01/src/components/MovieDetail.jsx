import { useState } from "react";
import styled from "styled-components";
import IMG_BASE_URL from "../constants/path";

const MovieContainer = styled.div`
    background-color: black;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden
    text-align: center;
    filter: ${({ hovered }) =>
      hovered ? "brightness(50%)" : "brightness(100%)"};
`;

const PosterImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
`;

const MovieTitle = styled.h3`
  font-size: 15px;
  margin: 10px 0;
  color: white;
`;

const ReleaseDate = styled.p`
  font-size: 12px;
  color: #ccc;
  margin-bottom: 10px;
`;

export default function Movie({ poster_path, title, release_date }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MovieContainer
      hovered={hovered ? 1 : 0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <PosterImage src={`${IMG_BASE_URL}${poster_path}`} alt="포스터 사진" />
      <MovieTitle>{title}</MovieTitle>
      <ReleaseDate>{release_date}</ReleaseDate>
    </MovieContainer>
  );
}
