import useCustomFetch from "../../hooks/useCustomFetch";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MoviesList from '../../components/MovieList';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MoviesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    gap: 60px;
    padding: 10px;
`;

const MoviesItem = styled.div`
    width: 170px;
    text-align: center;
    border-radius: 8px;
    margin: 10px;
`;

const MovieImage = styled.img`
    width: 170px;
    height: auto;
    border-radius: 8px;

    &:hover {
        filter: brightness(0.5);
        transform: scale(1.05);
    }
`;

const MoviesPage = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`, {
                    headers: {
                        Authorization: `Bearer 33629fc19f345be41465adcadcc51b6d`,
                    }
                })
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        getMovies();
    }, []);

    return (
        <PageWrapper>
            <MoviesContainer>
                {movies.map((movie) => (
                    <MoviesItem key={movie.id}>
                        <MovieImage src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>{movie.release_date}</p>
                    </MoviesItem>
                ))}
            </MoviesContainer>
        </PageWrapper>
    )
};

export default MoviesPage;
