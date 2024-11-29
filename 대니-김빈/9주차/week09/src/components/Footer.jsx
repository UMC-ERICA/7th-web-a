import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f1f1f1;
  padding: 1rem;
  text-align: center;
  color: #777;
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2024 UMC PlayList</p>
    </FooterContainer>
  );
}

export default Footer;
