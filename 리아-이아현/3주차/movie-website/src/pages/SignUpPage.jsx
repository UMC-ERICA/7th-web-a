import styled from "styled-components";

const SignUpContainer = styled.div`
  background-color: #222;
  color: white;
  height: 100vh;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 30px 30px;
`;

const SignUpPage = () => {
  return (
    <SignUpContainer>
      <h3>회원가입 페이지</h3>
    </SignUpContainer>
  );
};

export default SignUpPage;
