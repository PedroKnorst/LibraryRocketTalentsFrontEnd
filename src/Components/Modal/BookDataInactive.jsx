import React from "react";
import { ButtonClose, ContainerBook, InactiveButton } from "./BookContentStyle";
import { ReactComponent as Close } from "../../assets/svg/Caminho 265.svg";
import { ContainerInput, LabelInput, TextArea } from "../Inputs/Input";
import { BookModal } from "./ModalBookStyle";

const BookDataInactive = () => {
  return (
    <BookModal>
      <ContainerBook>
        <ButtonClose to="..">
          <Close />
        </ButtonClose>
        <ContainerInput style={{ gridColumn: "1 / 3" }}>
          <TextArea id="input_inactive" />
          <LabelInput htmlFor="input_inactive">Inativar</LabelInput>
        </ContainerInput>
        <InactiveButton style={{ gridColumn: "2 / 3" }}>
          Inativar
        </InactiveButton>
      </ContainerBook>
    </BookModal>
  );
};

export default BookDataInactive;
