import styled from "styled-components";

const SearchContainer = styled.div`
  background-color: #222;
  color: white;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
`;

const SearchBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px 0 0 10px;
  outline: none;
`;

const SearchButton = styled.button`
  height: 50px;
  width: 120px;
  font-size: 18px;
  color: white;
  background-color: #ff285e;
  border: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;

  &:hover {
    background-color: #e02250;
  }
`;

const SearchPage = () => {
  return (
    <SearchContainer>
      <SearchBox>
        <SearchInput placeholder="영화 제목을 입력해주세요..." />
        <SearchButton>검색</SearchButton>
      </SearchBox>
    </SearchContainer>
  );
};

export default SearchPage;

