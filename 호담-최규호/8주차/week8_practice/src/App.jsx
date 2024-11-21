import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { postTodo, getTodoList, deleteTodo, patchTodo } from "./apis/todo";
import { queryClient } from "./main";
import Spinner from "./components/LoadingSpinner";

const StyleContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: rgb(220, 240, 250);  
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-Top: 70px;
  font-size: 40px;
  font-weight: bold;
`

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-Top: 30px;
  margin-Bottom: 30px;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  margin-Bottom: 0;
  width: 600px;
`;

const CreateButton = styled.button`
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  height: auto;
  width: 600px;
  margin-Bottom: 50px;
  &:hover {
    background: cornflowerblue;
    color: white;
    transition: 0.5s;
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: #f5f5f5;
  color: #000;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: red;
    color: white;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`

const ListContainer = styled.div`
  display: row;
`;

const ToDoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  max-width: 600px;
`;

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const { data: todos, isPending } = useQuery({
    queryFn: () => getTodoList({ title: search }),
    queryKey: ["todos", search],
  });

  const { mutate:postTodoMutation } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: () => {},
  });

  const { mutate:deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const { mutate:patchTodoMutation } = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침을 방지하는 속성, 버튼이 눌릴 때 호출되는 것
    postTodoMutation({ title, content })
  }

  return (
    <StyleContainer>
      <Title>⚡️UMC ToDoList⚡️</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="title"
          placeholder="제목을 입력해주세요."
          value={title} 
          onChange={(e) => setTitle(e.target.value)} />
        <Input
          name="content"
          placeholder="콘텐츠를 입력해주세요."
          value={content} 
          onChange={(e) => setContent(e.target.value)} />
        <CreateButton type="submit">ToDo 생성</CreateButton>
      </Form>
      <SubTitle>찾고 싶은 리스트를 검색해주세요.</SubTitle>
      <Form onSubmit={handleSubmit}>
        <Input 
          placeholder="찾고 싶은 리스트를 검색하세요."
          value={search} 
          onChange={(e) => setSearch(e.target.value)} />
      </Form>
      {isPending ? (
        <Spinner />
      ) : (
        <Container>
          {todos[0]?.map((todo) => (
            <ToDoContainer key={todo.id}>
              <input type="checkbox" defaultChecked={todo.checked} onChange={(e) => patchTodoMutation({ id: todo.id, checked: !todo.checked })} />
              <ListContainer>
                <p>{todo.title}</p>
                <p>{todo.content}</p>
              </ListContainer>
              <DeleteButton onClick={() => deleteTodoMutation({ id: todo.id })}>삭제하기</DeleteButton>
            </ToDoContainer>
          ))}
        </Container>
      )}
    </StyleContainer>
  );
}

export default App;
