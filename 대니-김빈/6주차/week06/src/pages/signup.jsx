import React from 'react';
import './signup.css';
import useForm from '../hooks/useForm.js';
import { validateSignUp } from "../utils/validate.js";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Input = styled.input`
  width: 530px;
  height: 60px;
  font-size: 20px;
  margin-bottom: 10px;
  padding-left: 15px;
  border-radius: 8px;
  border: ${(props) => (props.error ? '2px solid red' : '1px solid #ccc')};

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 550px;
  height: 60px;
  font-size: 20px;
  margin-top: 20px;
  background-color: #F42E61;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #C4244B;
  }
`;

const SignUpPage = () => {
    const navigate = useNavigate();

    const signup = useForm({
        initialValues: {
            email: '',
            password: '',
            re_password: '',
        },
        validate: validateSignUp,
        onSubmit: async (values) => {
            try {
                console.log('회원가입 요청 전송:', {
                    email: values.email,
                    password: values.password,
                    passwordCheck: values.re_password,
                });
        
                const response = await axios.post('http://localhost:3000/auth/register', {
                    email: values.email,
                    password: values.password,
                    passwordCheck: values.re_password,
                });
                
                console.log('회원가입 성공:', response.data);
                alert('회원가입이 완료되었습니다!');
                navigate('/login');  // 회원가입 성공 시 로그인 페이지로 이동
            } catch (error) {
                if (error.response) {
                    console.error('회원가입 실패:', error.response.data);
                    alert(`회원가입 실패: ${error.response.data.message}`);
                } else {
                    console.error('서버 오류:', error.message);
                    alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
                }
            }
        }
    });

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1>회원가입</h1>

                <Input
                    error={signup.touched.email && signup.errors.email}
                    type="email"
                    placeholder="이메일을 입력해주세요!"
                    {...signup.getTextInputProps('email')}
                />
                {signup.touched.email && signup.errors.email && <p className='p1'>{signup.errors.email}</p>}

                <Input
                    error={signup.touched.password && signup.errors.password}
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                    {...signup.getTextInputProps('password')}
                />
                {signup.touched.password && signup.errors.password && <p className='p1'>{signup.errors.password}</p>}

                <Input
                    error={signup.touched.re_password && signup.errors.re_password}
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요!"
                    {...signup.getTextInputProps('re_password')}
                />
                {signup.touched.re_password && signup.errors.re_password && <p className='p1'>{signup.errors.re_password}</p>}
                
                <Button type="button" onClick={() => signup.handleSubmit()}>회원가입</Button>
            </div>
        </div>
    );
};

export default SignUpPage;
