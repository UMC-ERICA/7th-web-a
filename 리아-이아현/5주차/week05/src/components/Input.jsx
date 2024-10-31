import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 450px;
  height: 30px;
  padding: 10px;
  margin: 10px 0;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  outline: ${({ $isError }) => ($isError ? "2px solid red" : "none")};
  &:hover {
    outline: ${({ disabled }) => (disabled ? "gray" : "2px solid #2a4cd4")};
  }
`;

const Input = React.forwardRef(({ $isError, ...props }, ref) => (
  <StyledInput ref={ref} $isError={$isError} {...props} />
));

Input.displayName = "Input";

export default Input;
