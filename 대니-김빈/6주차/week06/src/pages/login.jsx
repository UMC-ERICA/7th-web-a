// LoginPage.js
import './login.css';
import useForm from '../hooks/useForm.js';
import { validateLogin } from "../utils/validate.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext.jsx';

const Input = styled.input`
  width: 530px;
  height: 60px;
  font-size: 20px;
  margin-bottom: 10px;
  padding-left: 15px;
  text-align: start;
  align-items: start;
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

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateLogin,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/auth/login', {
                    email: values.email,
                    password: values.password,
                });
                
                alert('로그인이 완료되었습니다!');
                login(response.data.accessToken, response.data.refreshToken);

                navigate('/');
            } catch (error) {
                if (error.response) {
                    alert(`로그인 실패: ${error.response.data.message}`);
                } else {
                    alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
                }
            }
        }
    });

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1>로그인</h1>
                <Input 
                    error={form.touched.email && form.errors.email}
                    type="email"
                    placeholder="이메일을 입력해주세요!"
                    {...form.getTextInputProps('email')}
                />
                {form.touched.email && form.errors.email && <p className='p1'>{form.errors.email}</p>}
                
                <Input 
                    error={form.touched.password && form.errors.password}
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                    {...form.getTextInputProps('password')}
                />
                {form.touched.password && form.errors.password && <p className='p1'>{form.errors.password}</p>}
                
                <Button type="button" onClick={form.handleSubmit}>로그인</Button>
            </div>  
        </div>
    );
};

export default LoginPage;
