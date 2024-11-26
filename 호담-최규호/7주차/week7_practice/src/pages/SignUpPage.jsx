import { useCallback } from "react";
import styled from "styled-components";
import useForm from "../hooks/useForm.jsx";
import { validateSignUp } from "../utils/validate.jsx";
import { useNavigate } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import irishman from "../assets/irishman.jpg";

const SignUpText = styled.div`
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
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${irishman});
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

const SignUpContainer = styled.div`
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

const SignUpButton = styled.button`
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

const SignUpPage = () => {
  const navigate = useNavigate();
  const memoizedValidate = useCallback((values) => validateSignUp(values), []);

  const signUpForm = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordCheck: '',
    },
    validate: memoizedValidate,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          passwordCheck: String(data.passwordCheck)
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '회원가입에 실패했습니다.');
      }
      
      return response.json();
    },
    onSuccess: () => {
      alert("회원가입 성공!");
      navigate("/login");
    },
    onError: (error) => {
      console.error("SignUp error:", error);
      alert(error.message || "회원가입 실패! 다시 시도해주세요.");
    },
  });

  return (
    <SignUpContainer>
      <Overlay />
      <SignUpText>회원가입</SignUpText>
      <FormContainer>
        <Input 
          $error={signUpForm.touched.email && signUpForm.errors.email} 
          type="email" 
          placeholder="이메일을 입력해주세요!" 
          {...signUpForm.getTextInputProps('email')} 
        />
        {signUpForm.touched.email && signUpForm.errors.email && 
          <ErrorText>{signUpForm.errors.email}</ErrorText>
        }
        <Input 
          $error={signUpForm.touched.password && signUpForm.errors.password} 
          type="password" 
          placeholder="비밀번호를 입력해주세요!" 
          {...signUpForm.getTextInputProps('password')} 
        />
        {signUpForm.touched.password && signUpForm.errors.password && 
          <ErrorText>{signUpForm.errors.password}</ErrorText>
        }
        <Input 
          $error={signUpForm.touched.passwordCheck && signUpForm.errors.passwordCheck} 
          type="password" 
          placeholder="비밀번호를 다시 입력해주세요!" 
          {...signUpForm.getTextInputProps('passwordCheck')} 
        />
        {signUpForm.touched.passwordCheck && signUpForm.errors.passwordCheck && 
          <ErrorText>{signUpForm.errors.passwordCheck}</ErrorText>
        }
        <SignUpButton 
          onClick={() => mutation.mutate(signUpForm.values)}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? '회원가입 중...' : '회원가입'}
        </SignUpButton>
      </FormContainer>
    </SignUpContainer>
  );
};

export default SignUpPage;