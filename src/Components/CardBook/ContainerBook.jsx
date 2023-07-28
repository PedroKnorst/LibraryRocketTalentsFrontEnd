import React from "react";
import { ContainerBookStyle } from "../LibraryStyle";

const ContainerBook = ({ book, setModal }) => {
  function openModal() {
    setModal(book);
  }

  return (
    <>
      <ContainerBookStyle key={book.title} onClick={openModal}>
        <img
          src={`http://localhost:3001/static/${book.image}`}
          alt={book.title}
        />
        <h2>{book.title}</h2>
      </ContainerBookStyle>
    </>
  );
};

export default ContainerBook;
