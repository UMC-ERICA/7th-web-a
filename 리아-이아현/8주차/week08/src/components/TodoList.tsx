import { useState } from "react";
import { TTodo } from "../types/todo";
import CheckBox from "./CheckBox";

interface ITodoList {
  todos: TTodo[];
  onToggleTodo: (id: number, checked: boolean) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, title: string, content: string) => void;
}

function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}: ITodoList) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const handleEdit = (todo: TTodo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditContent(todo.content);
  };

  const saveEdit = () => {
    if (editId !== null) {
      onEditTodo(editId, editTitle, editContent);
      setEditId(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editId === todo.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="제목 수정"
              />
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="내용 수정"
              />
              <button onClick={saveEdit}>저장</button>
              <button onClick={() => setEditId(null)}>취소</button>
            </>
          ) : (
            <>
              <CheckBox
                id={todo.id}
                label={todo.title}
                checked={todo.checked}
                onChange={() => onToggleTodo(todo.id, !todo.checked)}
              />
              <span>{todo.content}</span>
              <button onClick={() => handleEdit(todo)}>수정</button>
              <button onClick={() => onDeleteTodo(todo.id)}>삭제</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
