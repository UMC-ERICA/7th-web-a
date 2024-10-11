import instance from "./instance";

export const getMoviesCategory = (category, page = 1) => {
  return instance.get(`/movie/${category}?language=ko-KR&page=${page}`);
};
