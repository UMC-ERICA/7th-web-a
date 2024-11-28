import styled from 'styled-components';
import MoviesList from '../../components/MovieList';
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import SkeletonMovie from '../../components/skeletonmovie';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 2000px;
`;

const SkeletonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
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
    
    const [skeletonCount, setSkeletonCount] = useState(20);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

    if (isPending) {
        return <h1 style={{ color: 'white' }}>로딩 중 입니다...</h1>;
    }

    if (isError) {
        return <h1 style={{ color: 'white' }}>에러가 발생했습니다.</h1>;
    }

    const movies = data.pages.flatMap(page => page.results);
    

    return (
        <>
            <PageWrapper>
                <div>
                    <MoviesList movies={movies} />
                    <SkeletonContainer>
                        {[...Array(skeletonCount)].map((_, index) => (
                            <SkeletonMovie key={index} />
                        ))}
                    </SkeletonContainer>
                </div>
            </PageWrapper>
            
            <div ref={ref} style={{margin: '50px', display: "flex", justifyContent:'center', width:'100%'}}>
                    {!isFetching && <ClipLoader color={'#ffffff'}/>}
            </div>
        </>
    );
};

export default MoviesUpComingPage;
