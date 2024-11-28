import React, { useEffect } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { calculateTotals, clearCart } from "../store/cartSlice";

const CartContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  return (
    <Container>
      <Title>당신이 선택한 음반</Title>
      <CartList>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </CartList>
      <Footer>
        <TotalInfo>
          <ResetButton onClick={() => dispatch(clearCart())}>
            장바구니 초기화
          </ResetButton>
          <TotalPrice>총 가격: ₩{totalPrice.toLocaleString()}</TotalPrice>
          <TotalAmount>총 수량: {totalAmount}개</TotalAmount>
        </TotalInfo>
      </Footer>
    </Container>
  );
};

export default CartContainer;

const Container = styled.div`
  padding: 1rem 8rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Footer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
`;

const TotalInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
`;

const ResetButton = styled.button`
  background-color: white;
  color: #d9534f;
  border: 1px solid #d9534f;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
  width: auto;

  &:hover {
    background-color: #d9534f;
    color: white;
  }
`;

const TotalPrice = styled.h3`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const TotalAmount = styled.p`
  font-size: 1rem;
  color: gray;
  margin: 0.5rem 0;
`;
