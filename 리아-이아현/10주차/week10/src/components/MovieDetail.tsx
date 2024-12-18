import { useState } from "react";
import styled from "styled-components";
import IMG_BASE_URL from "../constants/path";
import { useNavigate } from "react-router-dom";

type MovieProps = {
  movieId: number;
  poster_path: string;
  title: string;
  release_date: string;
};

const MovieContainer = styled.div<{ hovered: boolean }>`
  background-color: black;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  filter: ${({ hovered }) =>
    hovered ? "brightness(50%)" : "brightness(100%)"};
  cursor: pointer;
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

export default function Movie({
  movieId,
  poster_path,
  title,
  release_date,
}: MovieProps) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <MovieContainer
      hovered={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleNavigation}
    >
      <PosterImage src={`${IMG_BASE_URL}${poster_path}`} alt="포스터 사진" />
      <MovieTitle>{title}</MovieTitle>
      <ReleaseDate>{release_date}</ReleaseDate>
    </MovieContainer>
  );
}
