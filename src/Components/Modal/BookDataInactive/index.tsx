import React from "react";
import { ButtonClose, ContainerBook, InactiveButton } from "../style";
import Close from "../../../assets/svg/Close";
import { BookModal } from "../ModalBook/style";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, putBook } from "../../../services/books";
import useForm from "../../../Hooks/useForm";
import { ContainerFormInactive } from "./style";
import InputTextArea from "../../Inputs/TexArea";

const BookDataInactive = () => {
  const [data, setData] = React.useState(null);
  const { id } = useParams();
  const description = useForm("description");
  const navigate = useNavigate();

  React.useEffect(() => {
    getBook(`${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          <InputTextArea
            id="input_synopsis"
            label="Sinopse"
            onChange={description.onChange}
            value={description.value}
            error={description.error}
          />
          <InactiveButton style={{ gridColumn: "2 / 3", justifySelf: "end" }}>
            Inativar
          </InactiveButton>
        </ContainerFormInactive>
      </ContainerBook>
    </BookModal>
  );
};

export default BookDataInactive;
