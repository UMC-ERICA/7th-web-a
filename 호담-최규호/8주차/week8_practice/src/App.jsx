import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { postTodo, getTodoList, deleteTodo, patchTodo } from "./apis/todo";
import { queryClient } from "./main";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid purple;
  border-radius: 20px;
  margin-Bottom: 20px;
`;

const Button = styled.button`
  border-radius: 10px;
  border: none;
  padding: 20px;
  &:hover {
    background: cornflowerblue;
    color: white;
    transition: 0.5s;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ToDoContainer = styled.div`
  display: flex;

  gap: 20px;
`;

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

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
    onSucess: () => {
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
    <>
      <h1>⚡️UMC ToDoList⚡️</h1>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
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
        <Button type="submit">투두 생성</Button>
      </Form>
      {isPending ? (
        <div>로딩중입니다.</div>
      ) : (
        <Container>
          {todos[0]?.map((todo) => (
            <ToDoContainer key={todo.id}>
              <input type="checkbox" defaultChecked={todo.checked} onChange={(e) => patchTodoMutation({ id: todo.id, checked: !todo.checked })} />
              <div>
                <p>{todo.title}</p>
                <p>{todo.content}</p>
              </div>
              <button onClick={() => deleteTodoMutation({ id: todo.id })}>삭제하기</button>
            </ToDoContainer>
          ))}
        </Container>
      )}
    </>
  );
}

export default App;
