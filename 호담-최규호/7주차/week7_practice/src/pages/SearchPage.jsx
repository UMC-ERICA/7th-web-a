import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useRecycleState from "../hooks/useRecycleState.jsx";
import MovieList from '../components/MovieList.jsx';
import styled from "styled-components";
import SkeletonList from "../components/Skeleton/SkeletonList.jsx"

const PageContainer = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
  background-color: #222;
`;

const SearchContainer = styled.div`
  display: grid;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #222;
  color: white;
  height: auto;
  font-weight: bold;
  font-size: 25px;
  padding: 0px 30px;

  input {
    flex: 1;
    height: 50px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
    margin-top: 20px;
  }

  button {
    width: 80px;
    background-color: #F82E62;
    color: white;
    height: 50px;
    cursor: pointer;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-top: 20px;
  }
`

const MovieGridContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`

const ErrorText = styled.div`
  text-align: center;
  margin-top: 20px;
  color: white;
  font-size: 30px;
  font-weight: bold;
  white-space: pre-line;
`

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // URL의 mq 파라미터로 초기 검색어 설정
  const [searchValue, setSearchValue] = useState(searchParams.get('mq') || '');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  // searchValue가 변경될 때마다 디바운스 적용
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchValue]);

  // 실제 검색 실행
  const handleSearchMovie = () => {
    if (!searchValue.trim()) return;
    setSearchParams({ mq: searchValue });
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === 'Enter') {
      handleSearchMovie();
    }
  };

  // URL에서 가져온 검색어로 API 호출
  const url = searchParams.get('mq') 
    ? `/search/movie?query=${searchParams.get('mq')}&include_adult=false&language=ko-KR&page=1`
    : null;

  const { data2: movies, isLoading, isError } = useRecycleState(url);

  if (isLoading) {
    return (
      <PageContainer>
        <InputContainer>
          <input
            placeholder="영화 제목을 입력해주세요..."
            value={searchValue}
            onChange={onChangeSearchValue}
            onKeyDown={handleSearchMovieWithKeyboard}
          />
          <button onClick={handleSearchMovie}>검색</button>
        </InputContainer>
        <MovieGridContainer>
          <SkeletonList number={20} />
        </MovieGridContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SearchContainer>
        <InputContainer>
          <input
            placeholder="영화 제목을 입력해주세요..."
            value={searchValue}
            onChange={onChangeSearchValue}
            onKeyDown={handleSearchMovieWithKeyboard}
          />
          <button onClick={handleSearchMovie}>검색</button>
        </InputContainer>
        {!isLoading && !isError && movies?.length === 0 && searchParams.get('mq') && (
          <ErrorText>
            {`해당하는 검색어 '${searchParams.get('mq')}'에\n해당하는 데이터가 없습니다.`}
          </ErrorText>
        )}
      </SearchContainer>
      <MovieGridContainer>
        {movies && movies.length > 0 && <MovieList movies={movies} />}
      </MovieGridContainer>
    </PageContainer>
  );
};

export default SearchPage;