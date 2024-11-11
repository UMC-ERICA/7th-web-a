import styled from "styled-components";
import useRecycleState from "../hooks/useRecycleState.jsx";
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
    const {data2: movies, isLoading, isError} = useRecycleState(`/movie/now_playing?language=ko-KR&page=1`)
    
    const {data, isPending, isLoading: movieLoading, isError: movieError} = useQuery({
      queryFn: () => useGetMovies({category: 'now_playing', pageParam: 1}), //안에 parameter가 없는 경우 query: useGetMovies로 사용할 수 있는데 파라미터가 있으면 이렇게 해줘야한다.
      queryKey: ['movies', 'now_playing'] //여기서 movies로 주면 polular나 nowplaying이나 같은 값을 받아오므로 구분할 수 있게 한번 더 카테고리까지 써줘야 한다
    })

    const navigate = useNavigate();

    if (isLoading) {
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
        <MovieList movies={movies} onClickMovieItem={onClickMovieItem} />
    );
};

export default PlayingPage;