// home.jsx
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  width: 2000px;
`;

const HomePage = () => {
    return (
        <PageWrapper>
            <h1>Home Page 야호~!</h1>
        </PageWrapper>
    );
};

export default HomePage;