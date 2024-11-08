import { Link } from "react-router-dom"
import styled from "styled-components";
import Logo from "../assets/logo.png";

const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between; 
    align-items: center;
    background-color: #333;
    color: white;
    height: 60px;
    width: 100%; 
`;

const Loggo = styled(Link)`
    display: flex;
    align-items: center;
    img {
        width: 120px;
        height: auto;
    }
    padding: 10px;
`;

const PublicButton = styled.div`
    color: black;
`;

const LocalButton = styled.button`
    font-size: 16px;
    color: black;
    background-color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #555;
    }
`;


const Login = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const SignUp = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff69b4;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const Navbar = () => {
    return (
        <TopBarContainer>
            <>
                <Loggo to = "/">
                    <img src = {Logo} alt = "로고 이미지"></img>
                </Loggo>
            </>
            <>
                <PublicButton>
                    <LocalButton>
                        <Login to = "/login">
                            로그인
                        </Login>
                    </LocalButton>
                    <LocalButton>
                        <SignUp to = "/signup">
                            회원가입
                        </SignUp>
                    </LocalButton>
                </PublicButton>
            </>
        </TopBarContainer>
    )
}

export default Navbar;
