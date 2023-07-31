import React from "react";
import {
  ButtonBorrow,
  ButtonClose,
  ContainerBook,
  LinkBorrow,
} from "./BookContentStyle";
import { ReactComponent as Close } from "../../assets/svg/Caminho 265.svg";
import { ContainerInput, Input, LabelInput } from "../Inputs/Input";
import { styled } from "styled-components";
import { ReactComponent as Book } from "../../assets/svg/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg";
import { getBook, putBook } from "../../services/books";
import { useParams } from "react-router-dom";
import { BookModal } from "./ModalBookStyle";

const ContainerBorrowInputs = styled.div`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const BookDataBorrow = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getBook(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  function changeBorrow() {
    putBook(id, { ...data, isBorrowed: true }).then((res) => {
      return res.data;
    });
  }

  return (
    <BookModal>
      <ContainerBook>
        <ButtonClose to="..">
          <Close />
        </ButtonClose>
        <ContainerBorrowInputs>
          <ContainerInput>
            <Input type="text" id="name" />
            <LabelInput htmlFor="name">Nome do Aluno</LabelInput>
          </ContainerInput>
          <ContainerInput>
            <Input type="text" id="class" />
            <LabelInput htmlFor="class">Turma</LabelInput>
          </ContainerInput>
          <ContainerInput>
            <Input type="date" id="withdrawalDate" />
            <LabelInput htmlFor="withdrawalDate">Data da retirada</LabelInput>
          </ContainerInput>
          <ContainerInput>
            <Input type="date" id="deliveryDate" />
            <LabelInput htmlFor="deliveryDate">Data da entrega</LabelInput>
          </ContainerInput>
          <LinkBorrow to={`../livro/${id}`} onClick={changeBorrow}>
            <Book />
            Emprestar
          </LinkBorrow>
        </ContainerBorrowInputs>
      </ContainerBook>
    </BookModal>
  );
};

export default BookDataBorrow;
