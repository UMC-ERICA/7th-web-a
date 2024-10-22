import useCustomFetch from "../../hooks/useCustomFetch";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MoviesList from '../../components/MovieList';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 2000px;
`;

const MoviesTopRatedPage = () => {
    const { data, isLoading, isError } = useCustomFetch('/movie/top_rated?language=ko-KR&page=1');
    const navigate = useNavigate();

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
        console.log(movieId);
    };

    if (isLoading) {
        return <h1 style={{ color: 'white' }}>로딩 중 입니다...</h1>;
    }

    if (isError) {
        return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
    }

    return (
        <PageWrapper>
            <MoviesList movies={data?.results || []} />
        </PageWrapper>
    );
};

export default MoviesTopRatedPage;
