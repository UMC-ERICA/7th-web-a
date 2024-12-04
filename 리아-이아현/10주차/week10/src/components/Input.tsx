import React, { forwardRef } from "react";
import styled from "styled-components";

type StyledInputProps = {
  $isError?: boolean;
};

const StyledInput = styled.input<StyledInputProps>`
  width: 350px;
  height: 30px;
  padding: 10px;
  margin: 10px 0;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  background-color: #efefef;
  outline: ${({ $isError }) => ($isError ? "2px solid red" : "none")};
  &:hover {
    outline: ${({ disabled }) => (disabled ? "gray" : "2px solid #2a4cd4")};
  }
`;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  StyledInputProps;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ $isError, ...props }, ref) => (
    <StyledInput ref={ref} $isError={$isError} {...props} />
  )
);

Input.displayName = "Input";

export default Input;
