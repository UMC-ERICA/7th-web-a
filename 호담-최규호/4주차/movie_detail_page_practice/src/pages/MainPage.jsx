import styled from "styled-components";

const MainContainer = styled.div`
  background-color: #222;
  color: white;
  height: 100vh;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 0px 30px;
`;

const MainPage = () => {
  return (
    <MainContainer>
      <h3>홈 페이지</h3>
    </MainContainer>
  );
};

export default MainPage;
