import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../assets/logo.png";

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
    width: 100px;
    height: auto;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
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
  return (
    <NavbarContainer>
      <Logo to="/">
        <img src={LogoImage} alt="로고" />
      </Logo>
      <NavButtons>
        <Button color={"#333"}>로그인</Button>
        <Button color={"#FF285E"}>회원가입</Button>
      </NavButtons>
    </NavbarContainer>
  );
};

export default Navbar;
