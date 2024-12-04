import React, { forwardRef } from "react";
import styled from "styled-components";

type StyledButtonProps = {
  width?: string;
  height?: string;
  disabled?: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "50px"};
  padding: 10px;
  margin: 20px 0;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: ${({ disabled }) => (disabled ? "gray" : "#ff285e")};
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "gray" : "#2a4cd4")};
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  StyledButtonProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <StyledButton ref={ref} {...props}>
      {children}
    </StyledButton>
  )
);

Button.displayName = "Button";

export default Button;
