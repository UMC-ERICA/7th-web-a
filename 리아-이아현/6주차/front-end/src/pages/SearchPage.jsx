import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetchMovies from "../hooks/useFetchMovies";
import MovieGrid from "../components/MovieGrid";

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

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    mq: "",
  });

  const mq = searchParams.get("mq");

  const handleSearchMovie = () => {
    if (mq === searchValue) return;
    navigate(`/search?mq=${searchValue}`);
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === "Enter") {
      handleSearchMovie();
    }
  };

  const url = `search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
  const { data: movies, isLoading, isError } = useFetchMovies(url);

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
        {isLoading && <p>로딩 중입니다...</p>}
        {isError && <p>에러가 발생했습니다. 다시 시도해주세요.</p>}
        {movies && movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          !isLoading && <p>해당하는 {searchValue}에 대한 데이터가 없습니다.</p>
        )}
      </SearchResults>
    </SearchContainer>
  );
};

export default SearchPage;
