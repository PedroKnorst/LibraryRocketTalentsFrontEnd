import React from "react";
import { ButtonClose, ContainerBook, InactiveButton } from "./BookContentStyle";
import { ReactComponent as Close } from "../../assets/svg/Caminho 265.svg";
import {
  ContainerInput,
  InputError,
  LabelInput,
  TextArea,
} from "../Inputs/Input";
import { BookModal } from "./ModalBookStyle";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, putBook } from "../../services/books";
import useForm from "../../Hooks/useForm";

const ContainerFormInactive = styled.form`
  display: grid;
  gap: 2rem;
`;

const BookDataInactive = () => {
  const [data, setData] = React.useState(null);
  const { id } = useParams();
  const description = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    getBook(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    if (description.validate()) {
      putBook(id, {
        ...data,
        status: { isActive: false, description: description.value },
      }).then((res) => {
        return res.data;
      });
      return navigate(`../livro/${id}`);
    }
  }

  return (
    <BookModal>
      <ContainerBook>
        <ButtonClose to="..">
          <Close />
        </ButtonClose>
        <ContainerFormInactive onSubmit={handleSubmit}>
          <h2 style={{ justifySelf: "start" }}>Inativar Livro</h2>
          <ContainerInput style={{ gridColumn: "1 / 3" }}>
            <TextArea
              onChange={description.onChange}
              value={description.value}
              style={{ width: "40rem", height: "8rem" }}
              id="input_inactive"
            />
            <LabelInput htmlFor="input_inactive">Descrição</LabelInput>
            {description.error && <InputError>{description.error}</InputError>}
          </ContainerInput>
          <InactiveButton style={{ gridColumn: "2 / 3", justifySelf: "end" }}>
            Inativar
          </InactiveButton>
        </ContainerFormInactive>
      </ContainerBook>
    </BookModal>
  );
};

export default BookDataInactive;
