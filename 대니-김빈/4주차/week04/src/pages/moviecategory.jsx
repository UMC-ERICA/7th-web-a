import styled from 'styled-components';
import { Link } from 'react-router-dom';
import image1 from '../assets/nature01.jpg';
import image2 from '../assets/nature02.jpg';
import image3 from '../assets/nature03.jpg';
import image4 from '../assets/nature04.jpg';


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 2000px;
`

const ImageWrapper = styled.div`
  display: flex;
  padding-left: 50px;
  gap: 50px;
  flex-direction: row;
  width: 2000px;
`
  const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageText = styled.p`
  margin-top: 10px;
  font-size: 20px;
`;

const MovieCategoryPage = () => {
    return (
        <PageWrapper>
            <h1>카테고리</h1>
            <ImageWrapper>
                <ImageContainer>
                    <Link to="../movies/now_playing">
                        <img src={image1} alt="이미지 설명" height = '300px' />
                    </Link>
                    <ImageText>현재 상영 중인</ImageText>
                </ImageContainer>
                <ImageContainer>
                <Link to="../movies/popular">
                        <img src={image2} alt="이미지 설명" height = '300px' />
                    </Link>
                    <ImageText>인기 있는</ImageText>
                </ImageContainer>
                <ImageContainer>
                <Link to="../movies/top_rated">
                        <img src={image3} alt="이미지 설명" height = '300px' />
                    </Link>
                    <ImageText>높은 평가를 받은</ImageText>
                </ImageContainer>
                <ImageContainer>
                <Link to="../movies/up_coming">
                        <img src={image4} alt="이미지 설명" height = '300px' />
                    </Link>
                    <ImageText>개봉 예정중인</ImageText>
                </ImageContainer>
            </ImageWrapper>
        </PageWrapper>
    );
};

export default MovieCategoryPage;