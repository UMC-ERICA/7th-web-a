import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CartItems from './CartItems';
import { clearCart } from "../features/cart/cartSlice"
import { openModal } from '../features/modal/modalSlice';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const AlbumList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

function CartContainer() {
  const { cartItems, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  console.log('전체 Redux 상태:', { cartItems, total });

  return (
    <Container>
      <Title>당신이 선택한 음반</Title>
      <AlbumList>
        {cartItems.map((album) => (
          <CartItems
            key={album.id}
            id={album.id}
            title={album.title}
            singer={album.singer}
            price={album.price}
            img={album.img}
            amount={album.amount}
          />
        ))}
      </AlbumList>
      <h1>총 금액: {Number(total).toLocaleString()}원</h1>
      <button onClick={() => dispatch(openModal())}>장바구니 비우기</button>
    </Container>
  );
}

export default CartContainer;
