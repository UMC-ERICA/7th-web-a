import { Link } from "react-router-dom";
import styled from "styled-components";
import movie1 from "../assets/movie1.jpg";
import movie2 from "../assets/movie2.jpg";
import movie3 from "../assets/movie3.jpg";
import movie4 from "../assets/movie4.jpg";

const MoviesContainer = styled.div`
  background-color: #222;
  color: white;
  height: 100vh;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 30px 30px;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const CategoryItem = styled(Link)`
  background-color: #333;
  border-radius: 15px;
  width: 100%;
  height: 150px;
  text-align: center;
  text-decoration: none;
  color: white;
  position: relative;

  &:hover {
    opacity: 0.8;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 15px;
  object-fit: cover;
`;

const CategoryText = styled.div`
  position: absolute;
  bottom: 5px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
`;

const MoviesPage = () => {
  return (
    <MoviesContainer>
      <h3>카테고리</h3>
      <CategoryList>
        <CategoryItem to="/movies/now-playing">
          <CategoryImage src={movie1} alt="현재 상영중인" />
          <CategoryText>현재 상영중인</CategoryText>
        </CategoryItem>
        <CategoryItem to="/movies/popular">
          <CategoryImage src={movie2} alt="인기있는" />
          <CategoryText>인기있는</CategoryText>
        </CategoryItem>
        <CategoryItem to="/movies/top-rated">
          <CategoryImage src={movie3} alt="높은 평가를 받은" />
          <CategoryText>높은 평가를 받은</CategoryText>
        </CategoryItem>
        <CategoryItem to="/movies/up-coming">
          <CategoryImage src={movie4} alt="개봉 예정중인" />
          <CategoryText>개봉 예정중인</CategoryText>
        </CategoryItem>
      </CategoryList>
    </MoviesContainer>
  );
};

export default MoviesPage;
