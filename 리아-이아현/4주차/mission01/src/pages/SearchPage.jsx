import styled from "styled-components";

const SearchContainer = styled.div`
  background-color: #222;
  color: white;
  height: 100vh;
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding: 30px 30px;
`;

const SearchPage = () => {
  return <SearchContainer><h3>검색 페이지 야호~!</h3></SearchContainer>;
};

export default SearchPage;
