import styled from 'styled-components';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainter';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';  
import { calculateTotals } from './features/cart/cartSlice';

// Wrapper 스타일링 (화면 중앙 정렬)
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  height: 100vh; /* 전체 화면 높이 */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() =>{
    dispatch(calculateTotals())
  },[cartItems])
  return (
    <Wrapper>
      <header>
        <Navbar />
      </header>
      <main>
        <CartContainer />
      </main>
      <footer>
        <Footer />
      </footer>
    </Wrapper>
  );
}

export default App;
