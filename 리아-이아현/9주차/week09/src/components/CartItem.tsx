import styled from "styled-components";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../store/cartSlice";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    singer: string;
    price: number;
    img: string;
    amount: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Item>
      <Image src={item.img} alt={item.title} />
      <Info>
        <Title>
          {item.title} | {item.singer}
        </Title>
        <Price>₩{item.price.toLocaleString()}</Price>
      </Info>
      <QuantityControls>
        <Button onClick={() => dispatch(increment(item.id))}>▲</Button>
        <Quantity>{item.amount}</Quantity>
        <Button onClick={() => dispatch(decrement(item.id))}>▼</Button>
      </QuantityControls>
    </Item>
  );
};

export default CartItem;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const Info = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0;
`;

const Price = styled.p`
  font-size: 0.9rem;
  color: gray;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Quantity = styled.span`
  font-size: 1rem;
`;
