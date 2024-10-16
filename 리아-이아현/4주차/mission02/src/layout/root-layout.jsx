import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";
import Sidebar from "../components/SideBar.jsx";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const RootLayout = () => {
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
