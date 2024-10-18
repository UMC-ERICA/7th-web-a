import { useEffect, useState } from "react";
import instance from "../apis/instance";

const useFetchMovieCredits = (url) => {
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCredits = async () => {
      setIsLoading(true);
      try {
        const response = await instance.get(url);
        setCredits(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCredits();
  }, [url]);

  return { credits, isLoading, isError };
};

export default useFetchMovieCredits;
