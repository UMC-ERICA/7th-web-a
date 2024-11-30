import { useSelector } from 'react-redux';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #6f42c1;
  color: white;
  text-align: center;
  padding: 50px;
  display: flex; /* Flexbox 사용 */
  justify-content: space-between;
  align-items: center;
`;

const NavbarTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const AmountDisplay = styled.p`
  font-size: 1rem;
  margin: 0;
`;

function Navbar() {
  const { amount } = useSelector((state) => state.cart);
  return (
    <NavbarContainer>
      <NavbarTitle>REAL DATA UMC PlayList</NavbarTitle>
      <AmountDisplay>{amount}</AmountDisplay>
    </NavbarContainer>
  );
}

export default Navbar;
