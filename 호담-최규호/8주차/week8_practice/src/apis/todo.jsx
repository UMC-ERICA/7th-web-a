import axiosInstance from "./axiosInstance";

const postTodo = async () => {
    const { data } = await axiosInstance.post("/todo", {});
};