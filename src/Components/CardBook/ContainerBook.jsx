import React from "react";
import { ContainerBookStyle } from "../LibraryStyle";
import Livro from "../../assets/livro01.png";

const ContainerBook = ({ book, setModal }) => {
  function openModal() {
    setModal(book);
  }

  return (
    <>
      <ContainerBookStyle key={book.title} onClick={openModal}>
        <img src={Livro} alt={book.title} />
        <h2>{book.title}</h2>
      </ContainerBookStyle>
    </>
  );
};

export default ContainerBook;
