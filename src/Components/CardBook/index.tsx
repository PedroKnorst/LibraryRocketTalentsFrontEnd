import React from "react";
import { ContainerBookStyle } from "./style";
import { Book } from "../../UserContext";

const ContainerBook: React.FC<Book> = ({ id, image, title }) => {
  return (
    <>
      <ContainerBookStyle to={`livro/${id}`}>
        <img src={`http://localhost:3001/static/${image}`} alt={title} />
        <h2>{title}</h2>
      </ContainerBookStyle>
    </>
  );
};

export default ContainerBook;
