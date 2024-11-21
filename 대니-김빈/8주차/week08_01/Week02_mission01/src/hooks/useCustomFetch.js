import axiosInstance from "../apis/axios-instance";
import { useMutation } from "@tanstack/react-query";

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
      // 추가 작업 가능 (예: UI 갱신)
    },
    onError: (error) => {
      console.error("POST 중 오류 발생:", error);
    },
  });
  

  const getData = useMutation({
    mutationFn: (id) => axiosInstance.get(`${url}/${id}`),
    onSuccess: () => {
      console.log("조회 성공");
    },
    onError: (error) => {
      console.error("조회 중 오류 발생:", error);
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
    getData: {
      mutate: getData.mutate,
      isLoading: getData.isLoading,
      isError: getData.isError,
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

export default useCustomFetch;
