import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";
import { clearCart } from "../store/cartSlice";

const Modal: React.FC = () => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <p>담아두신 모든 음반을 삭제하시겠습니까?</p>
        <ButtonGroup>
          <ConfirmButton onClick={handleClearCart}>네</ConfirmButton>
          <ClearButton onClick={handleCloseModal}>아니요</ClearButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
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
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
`;

const ConfirmButton = styled.button`
  background-color: white;
  border: 1px solid #5a5ed4;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5a5ed4;
    color: white;
  }
`;

const ClearButton = styled.button`
  background-color: white;
  border: 1px solid #d9534f;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d9534f;
    color: white;
  }
`;
