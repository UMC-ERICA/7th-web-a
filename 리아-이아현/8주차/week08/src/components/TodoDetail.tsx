import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTodoContext } from "../context/TodoContext";

function TodoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { todos, onEditTodo, onDeleteTodo } = useTodoContext();
  const [todo, setTodo] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const selectedTodo = todos.find((t) => t.id === Number(id));
    if (selectedTodo) {
      setTodo(selectedTodo);
      setEditTitle(selectedTodo.title);
      setEditContent(selectedTodo.content);
    }
  }, [id, todos]);

  const handleSave = () => {
    if (todo) {
      onEditTodo(todo.id, editTitle, editContent);
      alert("Todo 수정되었습니다!");
      navigate("/");
    }
  };

  const handleDelete = () => {
    if (todo) {
      onDeleteTodo(todo.id);
      alert("Todo 삭제되었습니다!");
      navigate("/");
    }
  };

  if (!todo) {
    return <p>Loading...</p>;
  }

  return (
    <DetailContainer>
      <TodoInfo>
        <p>
          <strong>Id:</strong> {todo.id}
        </p>
        <p>
          <strong>Title:</strong> {todo.title}
        </p>
        <p>
          <strong>Content:</strong> {todo.content}
        </p>
        <p>
          <strong>Created At:</strong> {todo.createdAt}
        </p>
        <p>
          <strong>Status:</strong> {todo.checked ? "완료" : "미완료"}
        </p>
      </TodoInfo>

      <EditSection>
        <h4>제목 및 내용 수정하기</h4>
        <StyledInput
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="제목 수정"
        />
        <StyledInput
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="내용 수정"
        />
        <ButtonGroup>
          <SaveButton
            onClick={handleSave}
            disabled={!editTitle.trim() || !editContent.trim()}
          >
            저장
          </SaveButton>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        </ButtonGroup>
      </EditSection>
    </DetailContainer>
  );
}

export default TodoDetail;

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TodoInfo = styled.div`
  margin-bottom: 20px;

  p {
    margin: 5px 0;
    font-size: 16px;
  }

  strong {
    font-weight: bold;
    color: #333;
  }
`;

const EditSection = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(SaveButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #b02a37;
  }
`;
