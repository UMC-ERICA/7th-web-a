import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222;
  color: white;
  width: 100%;
  height: 60vh;
  align-items: center;
  justify-content: flex-start;
  padding: 150px 0;
`;

const Title = styled.h1`
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 450px;
  height: 30px;
  padding: 10px;
  margin: 10px 0;
  font-size: 18px;
  border: none;
  border-radius: 8px;
`;

const LoginButton = styled.button`
  width: 470px;
  height: 60px;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 8px;
  background-color: #ff285e;
  color: white;
  cursor: pointer;
  margin-top: 20px;
`;

const LoginPage = () => {
  return (
    <LoginContainer>
      <Title>로그인</Title>
      <Input type="email" placeholder="이메일을 입력해주세요!" />
      <Input type="password" placeholder="비밀번호를 입력해주세요!" />
      <LoginButton>로그인</LoginButton>
    </LoginContainer>
  );
};

export default LoginPage;
