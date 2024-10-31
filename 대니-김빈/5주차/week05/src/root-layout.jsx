import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import styled from 'styled-components';
import TopBar from './components/Topbar';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const RootWrapper = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex: 1;
  color: white;
  padding: 10px;
  background-color: black;
  overflow-y: auto;
  width: 100%
`;



const RootLayout = () => {
  return (
    
    <RootWrapper>
      <Nav />
      <PageWrapper>
        <TopBar/>
        <Content>  
            <Outlet />
        </Content>
      </PageWrapper>
    </RootWrapper>
    
  );
};

export default RootLayout;