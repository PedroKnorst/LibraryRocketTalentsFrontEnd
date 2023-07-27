import React from "react";
import { styled } from "styled-components";
import BookContent from "./BookContent";

export const BookModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(52, 58, 64, 0.7);
  z-index: 100;
`;

const ModalBook = ({ modal, setModal }) => {
  return (
    <BookModal>
      {modal && <BookContent data={modal} setModal={setModal} />}
    </BookModal>
  );
};

export default ModalBook;
