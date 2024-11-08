import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

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

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => props.color || 'white'};
  background-color: ${(props) => props.bgColor || '#444'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#555'};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const TopBar = () => {
    const { isLoggedIn, nickname, logout } = useAuth();

    return (
        <TopBarWrapper>
            <div style={{ flex: 1 }}></div>
            <ButtonGroup>
                {isLoggedIn ? (
                    <>
                        <span style={{ fontSize: '18px', marginRight: '10px' }}>{nickname}님 반갑습니다.</span>
                        <StyledButton onClick={logout} bgColor="#F42E61" hoverColor="#c02050">로그아웃</StyledButton>
                    </>
                ) : (
                    <>
                        <StyledButton bgColor="#444" hoverColor="#555">
                            <StyledLink to="/login">로그인</StyledLink>
                        </StyledButton>
                        <StyledButton bgColor="#F42E61" hoverColor="#c02050">
                            <StyledLink to="/signup">회원가입</StyledLink>
                        </StyledButton>
                    </>
                )}
            </ButtonGroup>
        </TopBarWrapper>
    );
};

export default TopBar;
