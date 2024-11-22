import { ChangeEvent, useState } from "react";
import styled from "styled-components";

interface ITodoInput {
  onAddTodo: (text: string, content: string) => void;
}

function TodoInput({ onAddTodo }: ITodoInput) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleAddTodo = () => {
    if (title && content) {
      onAddTodo(title, content);
      setTitle("");
      setContent("");
    }
  };

  return (
    <Container>
      <StyledInput
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        placeholder="제목을 입력해주세요"
      />
      <StyledInput
        value={content}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setContent(e.target.value)
        }
        placeholder="내용을 입력해주세요"
      />
      <StyledButton
        onClick={handleAddTodo}
        disabled={!title.trim() || !content.trim()}
      >
        ToDo 생성
      </StyledButton>
    </Container>
  );
}

export default TodoInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
  width: 100%;
  margin: 50px auto;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;
