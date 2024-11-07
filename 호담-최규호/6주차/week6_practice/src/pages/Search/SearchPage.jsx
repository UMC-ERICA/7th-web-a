import { useSearchParams } from 'react-router-dom';
import * as S from './search.style.js'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useRecycleState from "../../hooks/useRecycleState.jsx";
import MovieList from '../../components/MovieList.jsx';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }
  const [searchParams, setSearchParams] = useSearchParams({
    mq: ''
  })

  const mq = searchParams.get('mq')

  const handleSearchMovie = () => {
    if (mq === searchValue) return;  //mq랑 searchValue랑 값이 똑같으면 또 검색하지 않는다.
    navigate(`/search?mq=${searchValue}`)
  }

  const handleSearchMovieWithKeyboard = (e) => {  // 엔터치면 입력되게 하는 함수
    if (e.key === 'Enter') {
      handleSearchMovie();
    }
  }
  const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;

  const {data2: movies, isLoading, isError} = useRecycleState(url);
  console.log("Movies data:", movies);
  console.log("Is loading:", isLoading);
  console.log("Is error:", isError);

  console.log(searchValue, '검색결과값')
  return (
    <>
        <S.SearchContainer>
          <input placeholder="영화 제목을 입력해주세요..." value={searchValue} onChange={onChangeSearchValue}
          onKeyDown = {handleSearchMovieWithKeyboard}  // 엔터치면 입력
          />
          <button onClick={handleSearchMovie}>검색</button>
        </S.SearchContainer>
        <S.MovieGridContainer>
            {movies.data?.results.map((movie) => (
              <MovieList key={movie.id} movie={movie}/>
            ))}
        </S.MovieGridContainer>
    </>
  );
};

export default SearchPage;
