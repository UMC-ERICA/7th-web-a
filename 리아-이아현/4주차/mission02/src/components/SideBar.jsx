import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  background-color: #333;
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
  cursor: pointer;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SideButtons>
        <Button to="/search" color={"#333"}>
          <FaSearch />
          찾기
        </Button>
        <Button to="/movies" color={"#333"}>
          <BiSolidCameraMovie />
          영화
        </Button>
      </SideButtons>
    </SidebarContainer>
  );
};

export default Sidebar;
