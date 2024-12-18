import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import MovieList from '../components/MovieList';
import SkeletonList from "../components/Skeleton/SkeletonList.jsx";
import { useGetPaginationMovies } from "../hooks/queries/useGetPaginationMovies";
import { useState, useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop.jsx";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #222;
`;

const MovieGridContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  background-color: #ff69b4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #333;
    cursor: not-allowed;
  }
`;

const PlayingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;

  const [page, setPage] = useState(initialPage);
  const { data, isFetching, isError, isPending } = useGetPaginationMovies({ category: 'now_playing', page });

  const onClickMovieItem = (movie) => {
    navigate(`/movie/${movie.id}`, {
      state: movie,
    });
  };

  const handleNextPage = () => setPage(prev => prev + 1);
  const handlePreviousPage = () => setPage(prev => Math.max(1, prev - 1));

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    query.set("page", page);
    navigate({ search: query.toString() }, { replace: true });
  }, [page, navigate, location.search]);

  if (isPending) {
    return (
      <PageContainer>
        <MovieGridContainer>
          <SkeletonList number={20} />
        </MovieGridContainer>
      </PageContainer>
    );
  }

  if (isError) {
    return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const movies = data?.results ?? [];

  return (
    <PageContainer>
      <ScrollToTop />
      <MovieGridContainer>
        <MovieList movies={movies} onClickMovieItem={onClickMovieItem} />
      </MovieGridContainer>
      {isFetching && <SkeletonList number={10} />}
      <PaginationControls>
        <PageButton onClick={handlePreviousPage} disabled={page === 1}>이전</PageButton>
        <span>{page} 페이지</span>
        <PageButton onClick={handleNextPage} disabled={!data?.total_pages || page >= data.total_pages}>다음</PageButton>
      </PaginationControls>
    </PageContainer>
  );
};

export default PlayingPage;
