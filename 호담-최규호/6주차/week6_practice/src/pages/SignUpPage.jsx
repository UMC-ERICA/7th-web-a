import { useCallback } from "react";
import styled from "styled-components";
import useForm from "../hooks/useForm.jsx";
import { validateSignUp } from "../utils/validate.jsx";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignUpText = styled.div`
  font-size: 1.625rem;
  font-weight: 700;
  color: white;
`;

const FormContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpContainer = styled.div`
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
  width: 100%;
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

const SignUpButton = styled.button`
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

const SignUpPage = () => {
  const navigate = useNavigate();

  const memoizedValidate = useCallback((values) => validateSignUp(values), []);

  const signUp = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordCheck: '',
    },
    validate: memoizedValidate,
  });

  const handlePressSignUp = () => {
    axios.post('http://localhost:3000/auth/register', {
        email: signUp.values.email,
        password: signUp.values.password,
        passwordCheck: String(signUp.values.passwordCheck)
      })
      .then(response => {
        navigate("/login");
      })
      .catch(error => {
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <SignUpContainer>
      <SignUpText>회원가입</SignUpText>
      <FormContainer>
        <Input $error={signUp.touched.email && signUp.errors.email} type="email" placeholder="이메일을 입력해주세요!" {...signUp.getTextInputProps('email')} />
        {signUp.touched.email && signUp.errors.email && <ErrorText>{signUp.errors.email}</ErrorText>}
        <Input $error={signUp.touched.password && signUp.errors.password} type="password" placeholder="비밀번호를 입력해주세요!" {...signUp.getTextInputProps('password')} />
        {signUp.touched.password && signUp.errors.password && <ErrorText>{signUp.errors.password}</ErrorText>}
        <Input $error={signUp.touched.passwordCheck && signUp.errors.passwordCheck} type="password" placeholder="비밀번호를 다시 입력해주세요!" {...signUp.getTextInputProps('passwordCheck')} />
        {signUp.touched.passwordCheck && signUp.errors.passwordCheck && <ErrorText>{signUp.errors.passwordCheck}</ErrorText>}
        <SignUpButton onClick={handlePressSignUp}>회원가입</SignUpButton>
      </FormContainer>
    </SignUpContainer>
  );
};

export default SignUpPage;
