import React from "react";
import { ContainerBookStyle } from "../LibraryStyle";

const ContainerBook = ({ book }) => {
  return (
    <>
      <ContainerBookStyle to={`livro/${book.id}`}>
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
