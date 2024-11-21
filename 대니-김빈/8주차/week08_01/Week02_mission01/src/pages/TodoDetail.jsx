import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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
  font-size: 24px;
  color: #333;
`;

const Content = styled.p`
  font-size: 18px;
  color: #555;
  margin-top: 10px;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// API 호출 함수
const fetchTodoDetail = async (id) => {
  const response = await axios.get(`http://localhost:3000/todo/${id}`);
  return response.data;
};

const TodoDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기

  const { data: todo, isLoading, isError } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodoDetail(id),
    staleTime: 60000, // 1분 동안 캐싱 유지
  });

  if (isLoading) return <DetailContainer>Loading...</DetailContainer>;
  if (isError) return <DetailContainer>Error loading Todo details</DetailContainer>;

  return (
    <DetailContainer>
      {todo ? (
        <>
          <Title>{todo.title}</Title>
          <Content>{todo.content}</Content>
          <BackButton onClick={() => window.history.back()}>뒤로가기</BackButton>
        </>
      ) : (
        <p>Todo를 찾을 수 없습니다.</p>
      )}
    </DetailContainer>
  );
};

export default TodoDetail;
