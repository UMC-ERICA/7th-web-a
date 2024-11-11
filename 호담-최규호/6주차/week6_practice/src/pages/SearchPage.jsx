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
  margin=top: 30px;
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
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const navigate = useNavigate();
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 1000);

    return () => clearTimeout(handler); // 이전 타이머를 지워줌으로써 중복 요청 방지
  }, [searchValue]);

  const [searchParams, setSearchParams] = useSearchParams({
    mq: ''
  })

  const mq = searchParams.get('mq')

  const handleSearchMovie = () => {
    if (mq === debouncedSearchValue) return;  // mq와 디바운스된 검색어가 같으면 검색하지 않음
    navigate(`/search?mq=${debouncedSearchValue}`);
  };

  const handleSearchMovieWithKeyboard = (e) => {  // 엔터치면 입력되게 하는 함수
    if (e.key === 'Enter') {
      handleSearchMovie();
    }
  }
  const url = `/search/movie?query=${debouncedSearchValue}&include_adult=false&language=ko-KR&page=1`;

  const {data2: movies, isLoading, isError} = useRecycleState(url);

  if (isLoading) {
    return (
      <PageContainer>
        <MovieGridContainer>
          {isLoading ? (
            <SkeletonList number={20}/>
          ) : (
            movies && movies.length > 0 && <MovieList movies={movies} />
          )}
        </MovieGridContainer>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <SearchContainer>
        <InputContainer>
          <input placeholder="영화 제목을 입력해주세요..." value={searchValue} onChange={onChangeSearchValue}
          onKeyDown = {handleSearchMovieWithKeyboard}  // 엔터치면 입력
          />
          <button onClick={handleSearchMovie}>검색</button>         
        </InputContainer>
        {!isLoading && !isError && movies.length === 0 && searchValue && (
          <ErrorText>
          {`해당하는 검색어 '${searchValue}'에 
          해당하는 데이터가 없습니다.`}
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