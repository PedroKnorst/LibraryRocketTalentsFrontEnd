import React from "react";
import { NavBack, NavBackHome, NavBackPage } from "../Components/NavBack";
import { ReactComponent as Back } from "../Assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";
import {
  ContainerInput,
  Input,
  InputFile,
  LabelInput,
  TextArea,
} from "../Components/Inputs/Input";
import {
  ContainerInputs,
  ContainerNewBook,
  SectionInputs,
} from "../Components/NewBookStyle";
import { ReactComponent as AddCapa } from "../Assets/svg/Caminho 261.svg";
import Select from "../Components/Inputs/Select";

const NewBook = () => {
  return (
    <ContainerNewBook>
      <NavBack>
        <NavBackHome to="/home">
          <Back /> Home
        </NavBackHome>
        <NavBackPage>/ Cadastrar novo livro</NavBackPage>
      </NavBack>
      <SectionInputs>
        <ContainerInputs>
          <InputFile style={{ gridArea: "capa" }}>
            <input type="file" accept="image/*" id="input_capa" />
            <span>
              <AddCapa />
              <p>Capa</p>
            </span>
          </InputFile>
          <ContainerInput style={{ gridArea: "titulo" }}>
            <Input type="text" id="input_title" />
            <LabelInput htmlFor="input_title">Título</LabelInput>
          </ContainerInput>
          <ContainerInput style={{ gridArea: "sinopse" }}>
            <TextArea id="input_sinopse" />
            <LabelInput htmlFor="input_sinopse">Sinopse</LabelInput>
          </ContainerInput>
          <ContainerInput style={{ gridArea: "autor" }}>
            <Input type="text" id="input_autor" />
            <LabelInput htmlFor="input_autor">Autor</LabelInput>
          </ContainerInput>
          <Select style={{ gridArea: "genero" }} label={"Gênero"} />
          <ContainerInput style={{ gridArea: "data" }}>
            <Input type="date" id="input_data" />
            <LabelInput htmlFor="input_data">Data de entrada</LabelInput>
          </ContainerInput>
        </ContainerInputs>
      </SectionInputs>
    </ContainerNewBook>
  );
};

export default NewBook;
