import React from "react";
import {
  ButtonBorrow,
  ButtonClose,
  ContainerBook,
  ContainerBookButtons,
  CoverBook,
  EditButton,
  HistoryButton,
  InactiveButton,
  LinkBorrow,
  TextBook,
} from "./BookContentStyle";
import { ReactComponent as Close } from "../../assets/svg/Caminho 265.svg";
import { ReactComponent as Book } from "../../assets/svg/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg";

const BookIsNotBorrowed = ({ data }) => {
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
        <LinkBorrow to={`../emprestar/${data.id}`}>
          <Book />
          Emprestar
        </LinkBorrow>
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

export default BookIsNotBorrowed;
