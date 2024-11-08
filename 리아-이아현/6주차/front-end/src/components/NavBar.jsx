import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  background-color: #333;
  color: white;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  img {
    width: 120px;
    height: auto;
  }
  padding: 10px;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 20px;
`;

const Button = styled(Link)`
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const { isLoggedIn, nickname, logout } = useContext(AuthContext);

  return (
    <NavbarContainer>
      <Logo to="/">
        <img src={LogoImage} alt="로고" />
      </Logo>
      <NavButtons>
        {isLoggedIn ? (
          <>
            <span>{nickname}님 반갑습니다!</span>
            <button
              onClick={logout}
              style={{
                backgroundColor: "#333",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "15px",
                cursor: "pointer",
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Button to="/login" color={"#333"}>
              로그인
            </Button>
            <Button to="/signup" color={"#FF285E"}>
              회원가입
            </Button>
          </>
        )}
      </NavButtons>
    </NavbarContainer>
  );
};

export default Navbar;
