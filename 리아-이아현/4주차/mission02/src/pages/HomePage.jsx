import styled from "styled-components";

const HomeContainer = styled.div`
  background-color: #222;
  color: white;
  height: 100vh;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 30px 30px;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <h3>홈 페이지</h3>
    </HomeContainer>
  );
};

export default HomePage;
