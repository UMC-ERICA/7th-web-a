import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useCustomFetch, { useGetData } from "../hooks/useCustomFetch";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f4f4f4;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #333;
`;

const Content = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 5px 15px;
  background-color: ${(props) => (props.delete ? "#d9534f" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.delete ? "#c9302c" : "#0056b3")};
  }
`;

const Input = styled.input`
  margin-top: 10px;
  padding: 8px;
  width: 100%;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TodoDetail = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const { data: todo, isLoading, isError } = useGetData(`/todo`, `/${id}`);

  const { patchData, deleteData } = useCustomFetch("/todo");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(todo?.title || "");
    setEditedContent(todo?.content || "");
  };

  const handleSave = () => {
    patchData.mutate(
      { id, data: { title: editedTitle, content: editedContent } },
      {
        onSuccess: () => {
          console.log("수정 성공");
          setIsEditing(false);
        },
        onError: (error) => {
          console.error("수정 실패:", error);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteData.mutate(id, {
      onSuccess: () => {
        console.log("삭제 성공");
        window.history.back(); // 삭제 후 이전 페이지로 이동
      },
      onError: (error) => {
        console.error("삭제 실패:", error);
      },
    });
  };

  if (isLoading) return <DetailContainer>Loading...</DetailContainer>;
  if (isError || !todo) return <DetailContainer>Error loading Todo details</DetailContainer>;

  return (
    <DetailContainer>
      {isEditing ? (
        <>
          <Input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="제목 수정"
          />
          <Input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="내용 수정"
          />
          <ButtonContainer>
            <ActionButton onClick={handleSave}>저장</ActionButton>
            <ActionButton delete onClick={() => setIsEditing(false)}>
              취소
            </ActionButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <Title>{todo.title}</Title>
          <Content>{todo.content}</Content>
          <ButtonContainer>
            <ActionButton onClick={handleEdit}>수정</ActionButton>
            <ActionButton delete onClick={handleDelete}>
              삭제
            </ActionButton>
          </ButtonContainer>
        </>
      )}
      <ButtonContainer>
        <ActionButton onClick={() => window.history.back()}>뒤로가기</ActionButton>
      </ButtonContainer>
    </DetailContainer>
  );
};

export default TodoDetail;
