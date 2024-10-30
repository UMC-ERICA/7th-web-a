import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import styled from "styled-components";

const SignUpText = styled.div`
  font-size: 1.625rem;
  font-weight: 700;
  color: white;
`;

const ErrorMassage = styled.div`
  color: red;
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

const SignUpPage = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!'),
    password: yup.string().min(8, '비밀번호는 8~16자 사이로 입력해주세요!').max(16, '비밀번호는 8~16자 사이로 입력해주세요!').required(),
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log('폼 데이터 제출')
    console.log(data);
  }

  return (
    <SignUpContainer>
      <SignUpText>
        회원가입
      </SignUpText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type={'email'} {...register("email")}/>
        <ErrorMassage>{errors.email?.message}</ErrorMassage>
        <input type={'password'} {...register("password")}/>
        <ErrorMassage>{errors.password?.message}</ErrorMassage>
        <input type={'submit'} value="회원가입"/>
      </form>
    </SignUpContainer>
  );
};

export default SignUpPage;