import useCustomFetch from "../../hooks/useCustomFetch";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MoviesList from '../../components/MovieList';
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 2000px;
`;

const MoviesUpComingPage = () => {
    const {
        data,
        isFetching,
        isLoading,
        hasNextPage,
        isPending,
        fetchNextPage,
        isFetchingNextPage,
        error,
        isError
    } = useGetInfiniteMovies('upcoming');

    const { ref, inView } = useInView({
        threshold: 0,
    });
    

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

    if (isLoading) {
        return <h1 style={{ color: 'white' }}>로딩 중 입니다...</h1>;
    }

    if (isError) {
        return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
    }

    const movies = data.pages.flatMap(page => page.results);

    return (
        <>
            <PageWrapper>
                <MoviesList movies={movies} />
            </PageWrapper>
            <div ref={ref} style={{margin: '50px', display: "flex", justifyContent:'center', width:'100%'}}>
                    {!isFetching && <ClipLoader color={'#ffffff'}/>}
            </div>
        </>
    );
};

export default MoviesUpComingPage;
