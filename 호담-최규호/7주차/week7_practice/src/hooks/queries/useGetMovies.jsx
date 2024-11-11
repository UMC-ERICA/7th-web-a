import axiosInstance from "../../apis/AxiosInstance";

const useGetMovies = async ({category, pageParam}) => {  //당연히 비동기 함수이므로 async 선언
    const {data} = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`)

    return data;
}

export {useGetMovies}
