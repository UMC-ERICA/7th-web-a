import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';
import styled from 'styled-components';

const Overlay = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ModalButton = styled.button`
  width: 100px;
  padding: 10px 10px;
  background-color: #6f42c1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #572a91;
  }
`;

const Modal = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay onClick={() => dispatch(closeModal())}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p>담아두신 모든 음반을 삭제하시겠습니까?</p>
        <ButtonGroup>
          <ModalButton
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            예
          </ModalButton>
          <ModalButton onClick={() => dispatch(closeModal())}>
            아니오
          </ModalButton>
        </ButtonGroup>
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
