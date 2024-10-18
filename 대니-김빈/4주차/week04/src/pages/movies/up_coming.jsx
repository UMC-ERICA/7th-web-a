import styled from 'styled-components';
import useCustomFetch from "../../hooks/useCustomFetch";
import { useNavigate } from 'react-router-dom';


const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 2000px;
`;

const MoviesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    gap: 30px;
    padding: 10px;
`;

const MoviesItem = styled.div`
    width: 170px;
    text-align: center;
    border-radius: 8px;
    margin: 10px;
`;

const MovieImage = styled.img`
    width: 170px;
    height: auto;
    border-radius: 8px;

    &:hover {
        filter: brightness(0.5);
        transform: scale(1.05);
    }
`;

const MoviesUpComingPage = () => {
    const { data, isLoading, isError } = useCustomFetch('/movie/upcoming?language=ko-KR&page=1');
    const navigate = useNavigate();

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
        console.log(movieId)
    };

    if (isLoading){
        return <div>
            <h1 style={{color:'white'}}>로딩 중 입니다..</h1>
        </div>
    }
    
    if (isError){
        return <div>
            <h1 style={{color:'white'}}>에러가 발생했습니다.</h1>
        </div>
    }

    return (
        <PageWrapper>
            <MoviesContainer>
                {data?.results?.map((movie) => (
                    <MoviesItem key={movie.id}>
                        <MovieImage
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} 
                            onClick={() => handleMovieClick(movie.id)}
                            />
                        <h3>{movie.title}</h3>
                        <p>{movie.release_date}</p>
                    </MoviesItem>
                ))}
            </MoviesContainer>
        </PageWrapper>
    );
};


export default MoviesUpComingPage;
