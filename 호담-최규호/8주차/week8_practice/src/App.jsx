import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid purple;
  border-radius: 20px;
`;

const Button = styled.button`
  border-radius: 10px;
  border: none;
  padding: 20px;
`

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침을 방지하는 속성
  }

  return (
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
  );
}

export default App;
