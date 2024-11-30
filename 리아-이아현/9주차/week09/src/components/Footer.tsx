import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>© 2024 UMC PlayList</p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  padding: 1rem;
  text-align: center;
  background-color: #f9f9f9;
  color: gray;
  font-size: 0.8rem;
`;
