import { useEffect, useState } from "react";
import axiosInstance from "../apis/AxiosInstance.jsx";

const useRecycleState = (url) => {
    const [data2, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(url)
                setData(response.data.results);
            } catch(error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url])

    return {data2, isLoading, isError}
}

export default useRecycleState;
