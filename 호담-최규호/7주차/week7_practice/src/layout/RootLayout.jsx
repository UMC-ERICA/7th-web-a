import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const LayoutContainer = styled.div`
    background-color: #333;
    min-height: 100vh;
    width: 100%;
`

const WidthAxis = styled.div`
    display: flex;
    width: calc(100% - 150px);
    height: 100vh;
    margin-left: 150px;
    background-color: #333;
`

const RootLayout = () => {
    return (
    <LayoutContainer>
        <Navbar/>
        <Sidebar/>
        <WidthAxis>    
            <Outlet/>
        </WidthAxis>
    </LayoutContainer>
    )
};

export default RootLayout;