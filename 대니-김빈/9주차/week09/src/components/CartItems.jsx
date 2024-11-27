import { useDispatch } from 'react-redux';
import { ChevronDown, ChevronUp } from '../constants/icon';
import { increase, decrease, removeItem } from '../features/cart/cartSlice'; // 액션 가져오기
import styled from 'styled-components';

const ItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

const AlbumImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AlbumTitle = styled.h4`
  margin: 0;
`;

const Price = styled.h4`
  margin: 0;
  color: #333;
`;

const AmountControls = styled.div`
  display: flex;
  align-items: center;

  button {
    border: none;
    background-color: transparent; /* 배경 투명색 */
    cursor: pointer;

    svg {
      width: 20px; /* 아이콘 크기 */
      height: 20px;
      stroke: black; /* 아이콘 색상 */
    }

    &:hover svg {
      stroke: #6f42c1; /* hover 상태에서 아이콘 색상 변경 */
    }
  }
`;

const CartItems = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <ItemContainer>
    
      <div style={{ display: 'flex', alignItems: 'center' }}>
        
        <AlbumImage src={img} alt={`${title} 이미지`} />
        <AlbumInfo>
            
          <AlbumTitle>
            {title} | {singer}
          </AlbumTitle>
          
          <Price>{Number(price).toLocaleString()}원</Price>
        </AlbumInfo>
      </div>
      <AmountControls>
      <button onClick={() => 
        {
            if (amount === 1){
                dispatch(removeItem(id));
            }
            dispatch(decrease(id));
        }}
        >
            <ChevronDown/>
        </button>
        <p>{amount}</p>
        <button onClick={() => dispatch(increase(id))}>
            <ChevronUp/>
        </button>
        
      </AmountControls>
    </ItemContainer>
  );
};

export default CartItems;
