import { SyncLoader } from "react-spinners";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingContainer>
      <SyncLoader />
      <LoadingMessage>게시글을 불러오는 중입니다..</LoadingMessage>
    </LoadingContainer>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const LoadingMessage = styled.h3`
  margin-top: 30px;
  font-size: 16px;
  color: #555;
`;
