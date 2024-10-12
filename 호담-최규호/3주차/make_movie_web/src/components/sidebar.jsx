import { Link } from "react-router-dom"
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { PiFilmSlate } from "react-icons/pi";

const SideBarColor = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #333;
  color: white;
  width: 150px;
  height: 100%;
`

const Button = styled.button`
    font-size: 16px;
    color: black;
    background-color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #555;
    }
`

const Search = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`

const FilmSlate = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`

const Sidebar = () => {
    return (
        <SideBarColor>
            <Button>
                <Search to = "/search">
                    <IoSearch />
                    찾기
                </Search>
            </Button>
            <Button>
                <FilmSlate to = "/movie">
                    <PiFilmSlate />
                    영화
                </FilmSlate>
            </Button>
        </SideBarColor>
    );
};
  
export default Sidebar;