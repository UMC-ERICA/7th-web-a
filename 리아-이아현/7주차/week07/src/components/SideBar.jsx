import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  background-color: #222;
  color: white;
  width: 150px;
`;

const SideButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: bold;
  font-size: 15px;
  background-color: ${(props) => props.color};
  padding: 15px;
  margin: 0 15px;
  cursor: pointer;
  color: #84868d;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: white;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SideButtons>
        <Button to="/search" color={"#222"}>
          <FaSearch />
          찾기
        </Button>
        <Button to="/movies" color={"#222"}>
          <BiSolidCameraMovie />
          영화
        </Button>
      </SideButtons>
    </SidebarContainer>
  );
};

export default Sidebar;
