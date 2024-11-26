import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const WidthAxis = styled.div`
    display: flex;
    width: calc(100% - 150px);
    height: 100vh;
    margin-left: 150px;
`

const RootLayout = () => {
    return (
    <>
        <Navbar/>
        <Sidebar/>
        <WidthAxis>    
            <Outlet/>
        </WidthAxis>
    </>
    )
};

export default RootLayout;
