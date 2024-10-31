import './login.css';
import useForm from '../hooks/useForm.js'
import {validateLogin} from "../utils/validate.js"

import styled from 'styled-components';

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


const LoginPage = () => {
    

    const login = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateLogin
    })

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1>로그인</h1>
                <Input error={login.touched.email && login.errors.email} type={"email"} placeholder={'이메일을 입력해주세요!'}{...login.getTextInputProps('email')}></Input>
                {login.touched.email && login.errors.email && <p className='p1'>{login.errors.email}</p>}
                <Input error={login.touched.password && login.errors.password} type={"password"} placeholder={'비밀번호를 입력해주세요!'}{...login.getTextInputProps('password')}></Input>
                {login.touched.password && login.errors.password && <p className='p1'>{login.errors.password}</p>}
            </div>  
        </div>
    );
};

export default LoginPage;