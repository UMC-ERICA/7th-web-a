import styled from "styled-components";
import useForm from "../hooks/useForm.jsx";
import { validateLogin } from "../utils/validate.jsx";
import { useNavigate } from 'react-router-dom';
import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // AuthContext 가져오기

const LoginText = styled.div`
  font-size: 1.625rem;
  font-weight: 700;
  color: white;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #222;
  color: white;
  height: 100vh;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 0px 30px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border: ${props => props.$error ? '4px solid red' : '1px solid #ccc'};

  &:focus {
    border-color: #007bff;
  }
`;

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
`;

const LoginButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff69b4;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 300px;
  text-align: center;
`;

const LoginPage = () => {
  const memoizedValidate = useCallback((values) => validateLogin(values), []);
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext); // AuthContext의 login 함수 가져오기

  const login = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: memoizedValidate,
  });

  const handlePressLogin = async () => {
    try {
      await authLogin(login.values.email, login.values.password); // AuthContext의 login 함수 호출
      navigate("/"); // 로그인 성공 후 페이지 이동
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error("로그인 실패:", error);
      }
    }
  };

  return (
    <LoginContainer>
      <LoginText>
        로그인
      </LoginText>
      <Input $error={login.touched.email && login.errors.email} type="email" placeholder="이메일을 입력해주세요!" {...login.getTextInputProps('email')} />
      {login.touched.email && login.errors.email && <ErrorText>{login.errors.email}</ErrorText>}
      <Input $error={login.touched.password && login.errors.password} type="password" placeholder="비밀번호를 입력해주세요!" {...login.getTextInputProps('password')} />
      {login.touched.password && login.errors.password && <ErrorText>{login.errors.password}</ErrorText>}

      <LoginButton onClick={handlePressLogin}>로그인</LoginButton>
    </LoginContainer>
  );
};

export default LoginPage;
