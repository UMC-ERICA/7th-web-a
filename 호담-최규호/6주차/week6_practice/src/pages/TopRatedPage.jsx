import styled from "styled-components";
import useRecycleState from "../hooks/useRecycleState.jsx";
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import SkeletonList from "../components/Skeleton/SkeletonList.jsx"

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

const TopRatedPage = () => {
    const {data2: movies, isLoading, isError} = useRecycleState(`/movie/top_rated?language=ko-KR&page=1`)
    const navigate = useNavigate();

    if (isLoading) {
        return (
          <PageContainer>
            <MovieGridContainer>
              <SkeletonList number={20}/>
            </MovieGridContainer>
          </PageContainer>
        )
    }

    const onClickMovieItem = (movie) => {
        navigate(`/movie/${movie.id}`, {
            state: movie,
        });
    };

    return (
        <MovieList movies={movies} onClickMovieItem={onClickMovieItem} />
    );
};

export default TopRatedPage;

