import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useCustomFetch from "../hooks/useCustomFetch";

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;


const MovieImageWrapper = styled.div`
  width: 100vw;
  height: 500px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const CreditWrapper = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: row;
  left:0;
  gap: 10px;
  box-sizing: border-box;
  flex-wrap: wrap
`;

const CreditImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    background-color: black;
    display: block;
    border: 2px solid white;
    justify-content: center;
    }
`;

  const MovieImage = styled.div`
    width: 100vw;
    height: 100%;
    background-image: 
      linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 50%), 
      url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
  `;

const MovieText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  max-width: 60%;
  border-radius: 8px;
  overflow: hidden;
  z-index: 2;
`;

const CreditText = styled.div`
  width: 150px;
  color: white;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;


const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { data: movieData, isLoading: movieLoading, isError: movieError } = 
    useCustomFetch(`/movie/${movieId}?language=ko-KR`);
    const { data: creditsData, isLoading: creditsLoading, isError: creditsError } = 
    useCustomFetch(`/movie/${movieId}/credits?language=ko-KR`);


    if (movieLoading || creditsLoading) {
        return (
          <div>
            <h1 style={{ color: 'white' }}>로딩 중 입니다..</h1>
          </div>
        );
      }
    
      if (movieError || creditsError) {
        return (
          <div>
            <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>
          </div>
        );
      }
    
      return (
        <PageWrapper>
          {movieData && (
            <div>
              <MovieImageWrapper>
                <MovieImage
                  image={`https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`}
                />
                <MovieText>
                  <h3 style={{marginTop:'10px',marginLeft:'10px', fontSize:'40px'}}>{movieData.title}</h3>
                  <div style={{fontSize:'24px',marginLeft:'10px'}}>평균 {movieData.vote_average.toFixed(1)}</div>
                  <div style={{fontSize:'24px',marginLeft:'10px'}}>{movieData.release_date.split('-')[0]}</div>
                  <div style={{fontSize:'24px',marginLeft:'10px'}}>{movieData.runtime}분</div>
                  <h3 style={{fontSize:'30px',marginLeft:'10px'}}>{movieData.tagline}</h3>
                  <p style={{fontSize:'18px',marginLeft:'10px'}}>{movieData.overview}</p>
                </MovieText>
              </MovieImageWrapper>
              <h1 style={{ color: 'white', paddingLeft: '50px' }}>감독/출연</h1>
              <CreditWrapper style={{ color: 'white', paddingLeft: '20px' }}>
                {creditsData?.cast?.map((cast) => (
                  <div style={{ color: 'white', paddingLeft: '30px' }}>
                    <CreditImage
                      src={
                        cast.profile_path
                          ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                          : ''
                      }
                    />
                    <CreditText>{cast.name}</CreditText>
                    <CreditText>{cast.character}</CreditText>
                    </div>
                ))}
              </CreditWrapper>
            </div>
          )}
        </PageWrapper>
      );
    };
    
    export default MovieDetailPage;