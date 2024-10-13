// navbar.jsx
import {Link} from "react-router-dom";
import { RiFindReplaceLine } from "react-icons/ri";
import { GoFileDirectory } from "react-icons/go";
import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  display: flex;
  background-color: #333;
  padding-left: 30px;
  padding-top: 30px;
  flex-direction: column;
  color: white;
  width: 300px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 20px;

  &:hover {
    background-color: #555;
    border-radius: 4px;
  }
`;


const Navbar = () => {
    return (
        <NavbarWrapper>
            <h3>
                <NavItem to="/">YONGCHA</NavItem>
            </h3>
            <br />
            <NavItem to="/search">
                <RiFindReplaceLine />&nbsp;&nbsp;찾기
            </NavItem>
            <br />
            <NavItem to="/moviecategory">
                <GoFileDirectory />&nbsp;&nbsp;영화
            </NavItem>
        </NavbarWrapper>
    );
};

export default Navbar;
