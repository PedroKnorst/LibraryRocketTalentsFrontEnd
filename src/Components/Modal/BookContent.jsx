import React from "react";
import { styled } from "styled-components";
import { ReactComponent as Close } from "../../assets/svg/Caminho 265.svg";
import { Link } from "react-router-dom";

const ContainerBook = styled.div`
  position: fixed;
  top: 3rem;
  left: 50%;
  max-width: 90%;
  background-color: white;
  transform: translateX(-50%);
  display: grid;
  grid-template-areas:
    "close close"
    "img text"
    "borrow edit";
  padding: 2.5rem;
  gap: 2rem;
`;

const ButtonClose = styled.button`
  cursor: pointer;
  justify-self: end;
  grid-area: close;
  background-color: transparent;
  border: none;
`;

const TextBook = styled.div`
  display: grid;
  gap: 1.5rem;
  color: #3e4756;
  grid-area: text;

  & h2 {
    justify-self: center;
    font-weight: 500;
    font-size: 1.25rem;
  }

  & div {
    display: grid;
    gap: 0.5rem;
  }

  & div h3 {
    font-weight: 500;
    font-size: 1rem;
  }

  & div p {
    font-weight: 300;
  }
`;

const CoverBook = styled.img`
  grid-area: img;
  max-width: 300px;
  height: 450px;
`;

const ContainerBookButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  grid-area: edit;
`;

const ButtonsStyle = `
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  padding: 1rem 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  background-color: white;
  border-radius: 5px;
  font-family: "Roboto", sans-serif;`;

const EditButton = styled(Link)`
  ${ButtonsStyle}
  border: #167ce2 solid 1px;
  color: #167ce2;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #d8e6f3;
  }
`;

const InactiveButton = styled.button`
  ${ButtonsStyle}
  border: #ed5e5e solid 1px;
  color: #ed5e5e;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f2cdcd;
  }
`;

const HistoryButton = styled.button`
  ${ButtonsStyle}
  border: #adb5bd solid 1px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e0e8ef;
  }
`;

const ButtonBorrow = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  gap: 0.5rem;
  border: #adb5bd solid 1px;
  background-color: #ffc501;
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ffd857;
  }
`;

const BookContent = ({ data, setModal }) => {
  function closeModal() {
    setModal(null);
  }

  return (
    <ContainerBook>
      <ButtonClose onClick={closeModal}>
        <Close />
      </ButtonClose>
      <CoverBook
        src={`http://localhost:3001/static/${data.image}`}
        alt="livro"
      />
      <ButtonBorrow>Emprestar</ButtonBorrow>
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
  );
};

export default BookContent;
