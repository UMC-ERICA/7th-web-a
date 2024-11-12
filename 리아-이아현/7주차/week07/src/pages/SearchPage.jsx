import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetchMovies from "../hooks/useFetchMovies";
import MovieGrid from "../components/MovieGrid";
import MovieSkeleton from "../components/MovieSkeleton";

const SearchContainer = styled.div`
  background-color: #222;
  color: white;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
`;

const SearchBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px 0 0 10px;
  outline: none;
`;

const SearchButton = styled.button`
  height: 50px;
  width: 120px;
  font-size: 18px;
  color: white;
  background-color: #ff285e;
  border: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;

  &:hover {
    background-color: #e02250;
  }
`;

const SearchResults = styled.div`
  margin-top: 20px;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
  padding: 20px;
`;

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mq = searchParams.get("mq");

  const handleSearchMovie = () => {
    if (mq === searchValue || searchValue.trim() === "") return;
    setIsSearched(true);
    navigate(`/search?mq=${searchValue}`);
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === "Enter") {
      handleSearchMovie();
    }
  };

  const searchUrl = `search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;
  const { data: movies, isLoading, isError } = useFetchMovies(searchUrl, ["search-movies", mq]);

  return (
    <SearchContainer>
      <SearchBox>
        <SearchInput
          placeholder="영화 제목을 입력해주세요..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <SearchButton onClick={handleSearchMovie}>검색</SearchButton>
      </SearchBox>

      <SearchResults>
        {isLoading ? (
          <SkeletonGrid>
            {Array.from({ length: 20 }, (_, index) => (
              <MovieSkeleton key={index} />
            ))}
          </SkeletonGrid>
        ) : isError ? (
          <p>에러가 발생했습니다. 다시 시도해주세요.</p>
        ) : movies && movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          isSearched && <p>해당하는 {mq}에 대한 데이터가 없습니다.</p>
        )}
      </SearchResults>
    </SearchContainer>
  );
};

export default SearchPage;
