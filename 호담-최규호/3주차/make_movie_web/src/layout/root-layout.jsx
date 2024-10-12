import react from "react";
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const WidthAxis = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`

const RootLayout = () => {
    return (
    <>
        <Navbar/>
        <WidthAxis>
            <Sidebar/>
            <Outlet/>
        </WidthAxis>
    </>
    )
};

export default RootLayout;
