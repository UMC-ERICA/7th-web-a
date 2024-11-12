import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import SkeletonList from "../components/Skeleton/SkeletonList.jsx"
import { useGetMovies } from "../hooks/queries/useGetMovies.jsx";
import { useQuery } from "@tanstack/react-query";

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

const PlayingPage = () => {
    
    const {data: movies, isPending, isError} = useQuery({
      queryFn: () => useGetMovies({category: 'now_playing', pageParam: 1}), //안에 parameter가 없는 경우 query: useGetMovies로 사용할 수 있는데 파라미터가 있으면 이렇게 해줘야한다.
      queryKey: ['movies', 'now_playing'], //여기서 movies로 주면 polular나 nowplaying이나 같은 값을 받아오므로 구분할 수 있게 한번 더 카테고리까지 써줘야 한다
      cacheTime: 10000, //서버 호출 비용 절감
      staleTime: 10000,
    })

    // isPending: 데이터를 불러오는 중입니다, 데이터가 로딩중일때 IsPending true
    // isLoading: 데이터를 불러오는 중이거나, 재시도 중 일때 true가 됩니다.

    const navigate = useNavigate();

    if (isPending) {
        return (
          <PageContainer>
            <MovieGridContainer>
              <SkeletonList number={20}/>
            </MovieGridContainer>
          </PageContainer>
        )
    }

    const onClickMovieItem = (movie) => {
        navigate(`/movie/${movie.id}`, {
            state: movie,
        });
    };

    return (
      <MovieList movies={movies?.results ?? []} onClickMovieItem={onClickMovieItem} />
    );
};

export default PlayingPage;
