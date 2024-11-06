import styled from "styled-components";

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    background-color: #222;
    color: white;
    height: 100vh;
    width: 100%;
    font-weight: bold;
    font-size: 25px;
    padding: 0px 30px;

  input {
    flex: 1;
    height: 50px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
    margin-top: 20px;
  }

  button {
    width: 80px;
    background-color: #F82E62;
    color: white;
    height: 50px;
    cursor: pointer;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-top: 20px;
  }
`;

export {SearchContainer}