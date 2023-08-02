import React from "react";
import {
  ButtonClose,
  ContainerBook,
  ContainerLinkBorrow,
} from "./BookContentStyle";
import { ReactComponent as Close } from "../../assets/svg/Caminho 265.svg";
import { ContainerInput, Input, InputError, LabelInput } from "../Inputs/Input";
import { styled } from "styled-components";
import { ReactComponent as Book } from "../../assets/svg/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg";
import { getBook, putBook } from "../../services/books";
import { useNavigate, useParams } from "react-router-dom";
import { BookModal } from "./ModalBookStyle";
import useForm from "../../Hooks/useForm";

const ContainerBorrowInputs = styled.form`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const BookDataBorrow = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const student = useForm();
  const team = useForm();
  const date1 = useForm();
  const date2 = useForm();
  const navigate = useNavigate();
  let newStudent = {
    studentName: student.value,
    class: team.value,
    withdrawalDate: date1.value,
    deliveryDate: date2.value,
  };

  React.useEffect(() => {
    getBook(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      student.validate() &&
      team.validate() &&
      date1.validate() &&
      date2.validate()
    ) {
      putBook(id, {
        ...data,
        rentHistory: [...data.rentHistory, newStudent],
        isBorrowed: true,
      }).then((res) => {
        return res.data;
      });
      return navigate(`../livro/${id}`);
    }
  }

  return (
    <BookModal>
      <ContainerBook>
        <h2>Informe os dados do aluno antes de continuar</h2>
        <ButtonClose to="..">
          <Close />
        </ButtonClose>
        <ContainerBorrowInputs onSubmit={handleSubmit}>
          <ContainerInput>
            <Input
              onChange={student.onChange}
              value={student.value}
              type="text"
              id="name"
            />
            <LabelInput htmlFor="name">Nome do Aluno</LabelInput>
            {student.error && <InputError>{student.error}</InputError>}
          </ContainerInput>
          <ContainerInput>
            <Input
              onChange={team.onChange}
              value={team.value}
              type="text"
              id="class"
            />
            <LabelInput htmlFor="class">Turma</LabelInput>
            {team.error && <InputError>{team.error}</InputError>}
          </ContainerInput>
          <ContainerInput>
            <Input
              onChange={date1.onChange}
              value={date1.value}
              type="date"
              id="withdrawalDate"
            />
            <LabelInput htmlFor="withdrawalDate">Data da retirada</LabelInput>
            {date1.error && <InputError>{date1.error}</InputError>}
          </ContainerInput>
          <ContainerInput>
            <Input
              onChange={date2.onChange}
              value={date2.value}
              type="date"
              id="deliveryDate"
            />
            <LabelInput htmlFor="deliveryDate">Data da entrega</LabelInput>
            {date2.error && <InputError>{date2.error}</InputError>}
          </ContainerInput>
          <ContainerLinkBorrow>
            <Book />
            Emprestar
          </ContainerLinkBorrow>
        </ContainerBorrowInputs>
      </ContainerBook>
    </BookModal>
  );
};

export default BookDataBorrow;
