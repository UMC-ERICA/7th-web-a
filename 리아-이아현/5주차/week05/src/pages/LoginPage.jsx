import { useState } from "react";
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

const ErrorMessage = styled.p.attrs((props) => ({
  isVisible: undefined,
}))`
  color: red;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 10px;
  text-align: left;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8 || value.length > 16) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <Input
        type="email"
        placeholder="이메일을 입력해주세요!"
        value={email}
        onChange={handleEmailChange}
      />
      <ErrorMessage $isVisible={emailError}>
        올바른 이메일 형식이 아닙니다. 다시 확인해주세요!
      </ErrorMessage>

      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요!"
        value={password}
        onChange={handlePasswordChange}
      />
      <ErrorMessage $isVisible={passwordError}>
        비밀번호는 8 ~ 16자리 사이로 입력해주세요!
      </ErrorMessage>

      <LoginButton>로그인</LoginButton>
    </LoginContainer>
  );
};

export default LoginPage;
