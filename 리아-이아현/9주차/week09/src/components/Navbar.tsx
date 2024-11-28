import styled from 'styled-components';

const Navbar = () => {
  return (
    <Nav>
      <h1>UMC PlayList</h1>
      <CartIcon>🛒</CartIcon>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #5a5ed4;
  color: white;
`;

const CartIcon = styled.div`
  font-size: 1.5rem;
`;
