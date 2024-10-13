// home.jsx
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  width: 2000px;
`;

const LoginPage = () => {
    return (
        <PageWrapper>
            <h1>로그인 페이지</h1>
        </PageWrapper>
    );
};

export default LoginPage;