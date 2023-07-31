import React from "react";
import { ReactComponent as Close } from "../../assets/svg/Caminho 265.svg";
import {
  ButtonBorrow,
  ButtonClose,
  ContainerBook,
  ContainerBookButtons,
  CoverBook,
  EditButton,
  HistoryButton,
  InactiveButton,
  TextBook,
} from "./BookContentStyle";
import { ReactComponent as Book } from "../../assets/svg/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg";
import { putBook } from "../../services/books";

const BookIsBorrowed = ({ data }) => {
  function changeBorrow() {
    putBook(data.id, { ...data, isBorrowed: false }).then((res) => {
      return res.data;
    });
    alert("Livro devolvido!");
    location.reload();
  }

  return (
    <>
      <ContainerBook>
        <ButtonClose to="..">
          <Close />
        </ButtonClose>
        <CoverBook
          src={`http://localhost:3001/static/${data.image}`}
          alt="livro"
        />
        <ButtonBorrow onClick={changeBorrow}>
          <Book />
          Devolver
        </ButtonBorrow>
        <TextBook>
          <h2>{data.title}</h2>
          <div>
            <h3>Sinopse</h3>
            <p>{data.synopsis}</p>
          </div>
          <div>
            <h3>Autor</h3>
            <p>{data.author}</p>
          </div>
          <div>
            <h3>Gênero</h3>
            <p>{data.genre}</p>
          </div>
          <div>
            <h3>Data de Entrada</h3>
            <p>{data.systemEntryDate}</p>
          </div>
        </TextBook>
        <ContainerBookButtons>
          <EditButton to={`/home/editar/${data.id}`}>Editar</EditButton>
          <InactiveButton>Inativar</InactiveButton>
          <HistoryButton>Histórico</HistoryButton>
        </ContainerBookButtons>
      </ContainerBook>
    </>
  );
};

export default BookIsBorrowed;
