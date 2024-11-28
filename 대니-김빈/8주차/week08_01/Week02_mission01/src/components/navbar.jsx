import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 hook
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .login {
    background-color: #007bff;
    color: #fff;
  }

  .signup {
    background-color: #28a745;
    color: #fff;
  }

  .logout {
    background-color: #dc3545;
    color: #fff;
  }
`;

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleLogin = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleSignup = () => {
    navigate('/register'); // 회원가입 페이지로 이동
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
    alert('로그아웃 성공!');
    setIsLoggedIn(false);
  };

  return (
    <NavbarContainer>
      <h1>My App</h1>
      <NavLinks>
        {isLoggedIn ? (
          <button className="logout" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <>
            <button className="login" onClick={handleLogin}>
              로그인
            </button>
            <button className="signup" onClick={handleSignup}>
              회원가입
            </button>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
