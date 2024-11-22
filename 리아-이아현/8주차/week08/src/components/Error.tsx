import { BiSolidError } from "react-icons/bi";
import styled from "styled-components";

function Error() {
  return (
    <ErrorContainer>
      <BiSolidError />
      <ErrorMessage>에러가 발생했습니다.</ErrorMessage>
    </ErrorContainer>
  );
}

export default Error;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const ErrorMessage = styled.h3`
  margin-top: 30px;
  font-size: 16px;
  color: #555;
`;
