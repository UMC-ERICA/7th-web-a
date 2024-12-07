import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Sidebar />
        <Outlet />
      </MainContainer>
    </>
  );
};

export default RootLayout;
