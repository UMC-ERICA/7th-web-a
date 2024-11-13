import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import Spinner from '../components/LoadingSpinner.jsx';
import SkeletonList from "../components/Skeleton/SkeletonList.jsx";
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfiniteMovies.jsx";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

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

const PopularPage = () => {

  const { data, isFetching, hasNextPage, fetchNextPage, isPending, isError } = useGetInfiniteMovies('popular');
  const { ref, inView } = useInView({ threshold: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isPending) {
    return (
      <PageContainer>
        <MovieGridContainer>
          <SkeletonList number={20}/>
        </MovieGridContainer>
      </PageContainer>
    )
  }

  if (isError) {
    return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const onClickMovieItem = (movie) => {
    navigate(`/movie/${movie.id}`, {
      state: movie,
    });
  };

  const movies = data?.pages.flatMap(page => page.results) ?? [];

  return (
    <PageContainer>
      <MovieGridContainer>
        <MovieList movies={movies} onClickMovieItem={onClickMovieItem} />
      </MovieGridContainer>
      {isFetching && <SkeletonList number={10} />}
      <Spinner />
      <div ref={ref} />
    </PageContainer>
  );
};

export default PopularPage;
