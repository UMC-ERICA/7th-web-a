import { ChangeEvent, useState } from "react";

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
    } else {
      alert("제목과 내용을 모두 입력해주세요!");
    }
  };

  return (
    <>
      <input
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        placeholder="제목을 입력해주세요"
      />
      <input
        value={content}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setContent(e.target.value)
        }
        placeholder="내용을 입력해주세요"
      />
      <button onClick={handleAddTodo}>ToDo 생성</button>
    </>
  );
}

export default TodoInput;
