import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleTodo, deleteTodo, editTodo } from "../redux/todoSlice";
import CheckBox from "./CheckBox";
import styled from "styled-components";
import { TTodo } from "../types/todo";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      dispatch(
        editTodo({ id: editId, title: editTitle, content: editContent })
      );
      setEditId(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  const handleNavigate = (id: number) => {
    navigate(`/todo/${id}`);
  };

  return (
    <StyledList>
      {todos.map((todo: TTodo) => (
        <StyledListItem key={todo.id}>
          {editId === todo.id ? (
            <EditContainer>
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
              <SaveButton
                onClick={saveEdit}
                disabled={!editTitle.trim() || !editContent.trim()}
              >
                저장
              </SaveButton>
              <CancelButton onClick={() => setEditId(null)}>취소</CancelButton>
            </EditContainer>
          ) : (
            <ContentContainer>
              <CheckBox
                id={todo.id}
                checked={todo.checked}
                onChange={() =>
                  dispatch(toggleTodo({ id: todo.id, checked: !todo.checked }))
                }
              />
              <Content onClick={() => handleNavigate(todo.id)}>
                <Title>{todo.title}</Title>
                <Description>{todo.content}</Description>
              </Content>
              <ActionButtons>
                <EditButton onClick={() => handleEdit(todo)}>수정</EditButton>
                <DeleteButton onClick={() => dispatch(deleteTodo(todo.id))}>
                  삭제
                </DeleteButton>
              </ActionButtons>
            </ContentContainer>
          )}
        </StyledListItem>
      ))}
    </StyledList>
  );
}

export default TodoList;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px auto;
  max-width: 600px;
`;

const StyledListItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;

  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Content = styled.div`
  flex-grow: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const Description = styled.span`
  font-size: 14px;
  color: #666;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SaveButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(SaveButton)`
  background-color: #dc3545;

  &:hover:not(:disabled) {
    background-color: #b02a37;
  }
`;

const EditButton = styled.button`
  padding: 8px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;

  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled(EditButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #b02a37;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;
