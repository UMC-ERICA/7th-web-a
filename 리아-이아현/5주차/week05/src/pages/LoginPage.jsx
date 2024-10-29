import useCustomForm from "../hooks/useCustomForm";
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

const LoginPage = () => {
  const { values, errors, touched, handleChange, handleBlur, isFormValid } =
    useCustomForm({
      email: "",
      password: "",
    });

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <Input
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요!"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        $isError={errors.email && touched.email}
      />
      <ErrorMessage $isVisible={errors.email && touched.email}>
        {errors.email}
      </ErrorMessage>

      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요!"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        $isError={errors.password && touched.password}
      />
      <ErrorMessage $isVisible={errors.password && touched.password}>
        {errors.password}
      </ErrorMessage>

      <LoginButton disabled={!isFormValid}>로그인</LoginButton>
    </LoginContainer>
  );
};

export default LoginPage;
