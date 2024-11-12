import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "../apis/instance";
import MovieGrid from "../components/MovieGrid";
import MovieSkeleton from "../components/MovieSkeleton";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: black;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const fetchNowPlayingMovies = async ({ pageParam = 1 }) => {
  const response = await instance.get(
    `/movie/now_playing?language=ko-KR&page=${pageParam}`
  );
  return {
    results: response.data.results,
    nextPage: pageParam + 1,
    totalPages: response.data.total_pages,
  };
};

const NowPlayingPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["now-playing"],
    queryFn: fetchNowPlayingMovies,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage <= lastPage.totalPages
        ? lastPage.nextPage
        : undefined;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.scrollHeight &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  const skeletonCount = 20;

  if (isLoading) {
    return (
      <PageContainer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "25px",
          }}
        >
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer
        style={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>에러가 발생했습니다. 다시 시도해주세요.</h1>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MovieGrid movies={data.pages.flatMap((page) => page.results)} />
      {isFetchingNextPage && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          }}
        >
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </PageContainer>
  );
};

export default NowPlayingPage;
