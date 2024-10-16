import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";


const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  height: 60px;
  width: 100%; 
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLoginButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: black;
  background-color: #444;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const StyledSignUpButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #F42E61;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c02050;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const TopBar = () => {
  return (
    <TopBarWrapper>
      <div style={{ flex: 1 }}></div>
      <ButtonGroup>
      <StyledLoginButton> <StyledLink to= '/login'>로그인</StyledLink> </StyledLoginButton>
        <StyledSignUpButton><StyledLink to= '/signup'>회원가입</StyledLink></StyledSignUpButton>
      </ButtonGroup>
    </TopBarWrapper>
  );
};

export default TopBar;
