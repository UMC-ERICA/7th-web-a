import styled from "styled-components";
import useForm from "../hooks/useForm.jsx";
import { validateLogin } from "../utils/validate.jsx";
import { useNavigate } from 'react-router-dom';
import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import ironman from "../assets/ironman.jpg";

const LoginText = styled.div`
  position: relative;
  z-index: 2;
  font-size: 1.625rem;
  font-weight: 700;
  color: white;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${ironman});
  background-size: cover;
  background-position: center;
  z-index: 1;
`;

const FormContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: white;
  height: 100%;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 0px 30px;
`;

const Input = styled.input`
  position: relative;
  z-index: 2;
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  border: ${props => props.$error ? '4px solid red' : '1px solid #ccc'};
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
  }
`;

const ErrorText = styled.h1`
  position: relative;
  z-index: 2;
  color: red;
  font-size: 12px;
`;

const LoginButton = styled.button`
  position: relative;
  z-index: 2;
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff69b4;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: center;
`;

const LoginPage = () => {
  const memoizedValidate = useCallback((values) => validateLogin(values), []);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: memoizedValidate,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await login(data.email, data.password);
    },
    onSuccess: () => {
      alert("로그인 성공!");
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
      alert("로그인 실패! 다시 시도해주세요.");
    },
  });

  return (
    <LoginContainer>
      <Overlay />
      <LoginText>
        로그인
      </LoginText>
      <FormContainer>
        <Input 
          $error={loginForm.touched.email && loginForm.errors.email} 
          type="email" 
          placeholder="이메일 (example@gmail.com)" 
          {...loginForm.getTextInputProps('email')} 
        />
        {loginForm.touched.email && loginForm.errors.email && 
          <ErrorText>{loginForm.errors.email}</ErrorText>
        }
        <Input 
          $error={loginForm.touched.password && loginForm.errors.password} 
          type="password" 
          placeholder="비밀번호"
          {...loginForm.getTextInputProps('password')} 
        />
        {loginForm.touched.password && loginForm.errors.password && 
          <ErrorText>{loginForm.errors.password}</ErrorText>
        }

        <LoginButton 
          onClick={() => mutation.mutate(loginForm.values)}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? '로그인 중...' : '로그인'}
        </LoginButton>
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginPage;