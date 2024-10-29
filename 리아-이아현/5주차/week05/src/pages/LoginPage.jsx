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
  outline: ${({ $isError }) => ($isError ? "2px solid red" : "none")};
`;

const ErrorMessage = styled.p`
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
  background-color: ${({ disabled }) => (disabled ? "gray" : "#ff285e")};
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 20px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(!e.target.value.includes("@"));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.value.length < 8 || e.target.value.length > 16);
  };

  const handleEmailBlur = () => setEmailTouched(true);
  const handlePasswordBlur = () => setPasswordTouched(true);

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <Input
        type="email"
        placeholder="이메일을 입력해주세요!"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        $isError={emailError && emailTouched}
      />
      <ErrorMessage $isVisible={emailError && emailTouched}>
        올바른 이메일 형식이 아닙니다. 다시 확인해주세요!
      </ErrorMessage>

      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요!"
        value={password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        $isError={passwordError && passwordTouched}
      />
      <ErrorMessage $isVisible={passwordError && passwordTouched}>
        비밀번호는 8 ~ 16자리 사이로 입력해주세요!
      </ErrorMessage>

      <LoginButton
        disabled={emailError || passwordError || !email || !password}
      >
        로그인
      </LoginButton>
    </LoginContainer>
  );
};

export default LoginPage;
