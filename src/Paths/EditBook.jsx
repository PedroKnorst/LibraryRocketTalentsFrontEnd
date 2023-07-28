import React from "react";
import {
  ButtonCancel,
  ButtonSave,
  ConitainerButtons,
  ContainerInputs,
  ContainerNewBook,
  SectionInputs,
} from "../Components/NewBookStyle";
import { NavBack, NavBackHome, NavBackPage } from "../Components/NavBack";
import { ReactComponent as Back } from "../assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";
import {
  ContainerInput,
  Input,
  InputFile,
  LabelInput,
  TextArea,
} from "../Components/Inputs/Input";
import { ReactComponent as AddCapa } from "../assets/svg/Caminho 261.svg";
import Select from "../Components/Inputs/Select";
import { useParams } from "react-router-dom";
import { getBook } from "../services/books";

const EditBook = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getBook(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  if (data)
    return (
      <ContainerNewBook>
        <NavBack>
          <NavBackHome to="/home/biblioteca">
            <Back /> Biblioteca
          </NavBackHome>
          <NavBackPage>/ Editar livro</NavBackPage>
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
              <Input value={data.title} type="text" id="input_title" />
              <LabelInput htmlFor="input_title">Título</LabelInput>
            </ContainerInput>
            <ContainerInput style={{ gridArea: "sinopse" }}>
              <TextArea value={data.synopsis} id="input_sinopse" />
              <LabelInput htmlFor="input_sinopse">Sinopse</LabelInput>
            </ContainerInput>
            <ContainerInput style={{ gridArea: "autor" }}>
              <Input value={data.author} type="text" id="input_autor" />
              <LabelInput htmlFor="input_autor">Autor</LabelInput>
            </ContainerInput>
            <Select
              style={{ gridArea: "genero" }}
              labelStyle={"#133052"}
              label={"Gênero"}
            />
            <ContainerInput style={{ gridArea: "data" }}>
              <Input type="date" id="input_data" />
              <LabelInput htmlFor="input_data">Data de entrada</LabelInput>
            </ContainerInput>
          </ContainerInputs>
          <ConitainerButtons>
            <ButtonCancel to="/home/biblioteca">Cancelar</ButtonCancel>
            <ButtonSave>Salvar</ButtonSave>
          </ConitainerButtons>
        </SectionInputs>
      </ContainerNewBook>
    );
  else return null;
};

export default EditBook;
