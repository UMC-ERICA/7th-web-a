import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const schema = yup.object().shape({
  email: yup
    .string()
    .email("유효한 이메일 형식이 아닙니다.")
    .required("이메일을 반드시 입력해주세요."),
  password: yup
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다.")
    .required("비밀번호를 입력해주세요."),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("로그인 데이터:", data);
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
          $isError={errors.email && touchedFields.email}
        />
        <ErrorMessage $isVisible={errors.email && touchedFields.email}>
          {errors.email?.message}
        </ErrorMessage>

        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
          $isError={errors.password && touchedFields.password}
        />
        <ErrorMessage $isVisible={errors.password && touchedFields.password}>
          {errors.password?.message}
        </ErrorMessage>

        <LoginButton type="submit" disabled={!isValid}>
          로그인
        </LoginButton>
      </form>
    </LoginContainer>
  );
};

export default LoginPage;
