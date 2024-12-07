import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import movie4 from "../assets/movie4.jpg";

const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  background-image: url(${movie4});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: left;
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

type FormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const { login } = useContext<AuthContextType>(AuthContext);

  const mutation: UseMutationResult<void, Error, FormData> = useMutation({
    mutationFn: async (data: FormData) => {
      await login(data.email, data.password);
    },
    onSuccess: () => {
      alert("로그인 성공!");
      navigate("/");
    },
    onError: () => {
      alert("로그인 실패! 다시 시도해주세요.");
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  const { status } = mutation;

  return (
    <LoginContainer>
      <Overlay />
      <Content>
        <Title>로그인</Title>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요!"
            {...register("email")}
            $isError={!!errors.email && touchedFields.email}
          />
          {errors.email && touchedFields.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}

          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            {...register("password")}
            $isError={!!errors.password && touchedFields.password}
          />
          {errors.password && touchedFields.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}

          <Button type="submit" disabled={!isValid || status === "pending"}>
            {status === "pending" ? "로그인 중..." : "로그인"}
          </Button>
        </LoginForm>
      </Content>
    </LoginContainer>
  );
};

export default LoginPage;
