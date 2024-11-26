import axiosInstance from "./axiosInstance";

const postTodo = async ({ title, content, checked = false }) => { // checked는 안넘겨도 DB에서 자동으로 false로 해준다
    const { data } = await axiosInstance.post("/todo", {
        title: title,
        content: content,
        checked: checked,
    });

    return data;
};

const getTodoList = async ({ title }) => {
    let url = "/todo"; // const는 변경될 수 없으므로 let으로 선언하였습니다

    if(title) {
        url += `?title=${title}`;
    }

    const { data } = await axiosInstance.get(url);

    return data;
};

const getTodo = async ({ id }) => {
    const { data } = await axiosInstance.get(`/todo/${id}`);

    return data;
};

const patchTodo = async ({ id, title, content, checked }) => {
    const { data } = await axiosInstance.patch(`/todo/${id}`, {
        title,
        content,
        checked,
    });

    return data;
};

const deleteTodo = async ({ id }) => {
    const { data } = await axiosInstance.delete(`/todo/${id}`);

    return data;
};


export { postTodo, getTodo, getTodoList, patchTodo, deleteTodo };