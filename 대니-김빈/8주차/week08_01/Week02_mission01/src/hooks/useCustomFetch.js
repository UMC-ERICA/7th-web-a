import axiosInstance from "../apis/axios-instance";
import { useMutation,useQuery } from "@tanstack/react-query";
import { useState, useEffect  } from "react";
import debounce from "lodash/debounce";

const useCustomFetch = (url) => {

  const patchData = useMutation({
    mutationFn: ({ id, data }) => axiosInstance.patch(`${url}/${id}`, data),
    onSuccess: (data) => {
      console.log("PATCH 성공:", data);
    },
    onError: (error) => {
      console.error("PATCH 중 오류 발생:", error);
    },
  });
  
  const postData = useMutation({
    mutationFn: (data) => axiosInstance.post(url, data),
    onSuccess: (data) => {
      console.log("POST 성공:", data);
    },
    onError: (error) => {
      console.error("POST 중 오류 발생:", error);
    },
  });

  const deleteData = useMutation({
    mutationFn: (id) => axiosInstance.delete(`${url}/${id}`),
    onSuccess: () => {
      console.log("삭제 성공");
    },
    onError: (error) => {
      console.error("삭제 중 오류 발생:", error);
    },
  });

  return {
    postData: {
      mutate: postData.mutate,
      isLoading: postData.isLoading,
      isError: postData.isError,
    },
    patchData: {
      mutate: patchData.mutate,
      isLoading: patchData.isLoading,
      isError: patchData.isError,
    },
    deleteData: {
      mutate: deleteData.mutate,
      isLoading: deleteData.isLoading,
      isError: deleteData.isError,
    },
  }
};

export const useGetData = (url, queryParam = "") => {
  return useQuery({
    queryKey: [url, queryParam],
    queryFn: async () => {
      const data = await axiosInstance.get(`${url}${queryParam}`);
      console.log("서버 응답 전체:", data);

      return data || [];
    },
})
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler(); // 실행

    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};


export default useCustomFetch;
