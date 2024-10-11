import { useEffect, useState } from "react";
import { getMoviesCategory } from "../apis/movies";
import MovieGrid from "../components/MovieGrid";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMoviesCategory("now_playing");
        setMovies(response.data.results);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchMovies();
  }, []);

  return <MovieGrid movies={movies} />;
};

export default NowPlayingPage;
