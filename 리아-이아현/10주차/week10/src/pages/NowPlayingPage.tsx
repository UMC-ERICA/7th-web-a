import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "../apis/instance";
import MovieGrid from "../components/MovieGrid";
import MovieSkeleton from "../components/MovieSkeleton";
import Button from "../components/Button";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-top: 2px solid #444;
`;

const PageButton = styled(Button)`
  width: 80px;
  height: 40px;
  font-size: 15px;
  margin: 0;
`;

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

const fetchMovies = async (page: number): Promise<Movie[]> => {
  const response = await instance.get(
    `/movie/now_playing?language=ko-KR&page=${page}`
  );
  return response.data.results;
};

const NowPlayingPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery<Movie[]>({
    queryKey: ["now-playing-movies", page],
    queryFn: () => fetchMovies(page),
  });

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

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
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer style={{ color: "white", textAlign: "center" }}>
        <h1>에러가 발생했습니다. 다시 시도해주세요.</h1>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentContainer>
        <MovieGrid movies={data || []} />
      </ContentContainer>
      <PaginationContainer>
        <PageButton onClick={handlePreviousPage} disabled={page === 1}>
          이전
        </PageButton>
        <span style={{ color: "white", fontSize: "18px" }}>{page} 페이지</span>
        <PageButton onClick={handleNextPage}>다음</PageButton>
      </PaginationContainer>
    </PageContainer>
  );
};

export default NowPlayingPage;
