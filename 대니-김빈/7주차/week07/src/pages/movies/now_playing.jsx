import styled from 'styled-components';
import { useState } from 'react';
import MoviesList from '../../components/MovieList';
import { useGetPaginatedMovies } from "../../hooks/queries/useGetPaginatedMovies ";
import ClipLoader from "react-spinners/ClipLoader";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 2000px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 15px 25px;
  font-size: 16px;
  color: ${(props) => props.disabled ? '#ccc' : props.color || 'white'};
  background-color: ${(props) => props.disabled ? '#888' : props.bgColor || '#444'};
  margin: 0 20px;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#888' : props.hoverColor || '#555')};
  }
`;

const MoviesNowPlayingPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, isError } = useGetPaginatedMovies('now_playing', page);

    if (isLoading) {
        return <h1 style={{ color: 'white' }}>로딩 중 입니다...</h1>;
    }

    if (isError) {
        return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
    }

    const movies = data?.results || [];

    return (
        <>
            <PageWrapper>
                <MoviesList movies={movies} />
            </PageWrapper>
            <PaginationContainer>
                <StyledButton
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1 || isFetching}
                    bgColor="#F42E61" hoverColor="#c02050">
                    이전
                </StyledButton>

                <span style={{ color: 'white',  fontSize: '26px' }}>{page} 페이지</span>

                <StyledButton 
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!data?.hasNextPage || isFetching} 
                    bgColor="#F42E61" hoverColor="#c02050">
                        다음
                </StyledButton>
                
            </PaginationContainer>
            {isFetching && (
                <div style={{ display: "flex", justifyContent: 'center', marginTop: '20px' }}>
                    <ClipLoader color={'#ffffff'} />
                </div>
            )}
        </>
    );
};

export default MoviesNowPlayingPage;
