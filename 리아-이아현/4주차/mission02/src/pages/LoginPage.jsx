import styled from "styled-components";

const LoginContainer = styled.div`
  background-color: #222;
  color: white;
  height: 100vh;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 30px 30px;
`;

const LoginPage = () => {
  return (
    <LoginContainer>
      <h3>로그인 페이지</h3>
    </LoginContainer>
  );
};

export default LoginPage;