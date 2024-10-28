import useCustomFetch from "../../hooks/useCustomFetch";
import styled from 'styled-components';
import MoviesList from '../../components/MovieList';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 2000px;
`;

const MoviesNowPlayingPage = () => {
    const { data, isLoading, isError } = useCustomFetch('/movie/now_playing?language=ko-KR&page=1');

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

export default MoviesNowPlayingPage;
