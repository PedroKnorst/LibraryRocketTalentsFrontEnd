import React from "react";
import { NavBack, NavBackHome, NavBackPage } from "../Components/NavBack";
import { ReactComponent as Back } from "../assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";
import {
  ContainerInput,
  Input,
  LabelInput,
  TextArea,
} from "../Components/Inputs/Input";
import {
  ButtonCancel,
  ButtonSave,
  ConitainerButtons,
  ContainerInputs,
  ContainerNewBook,
  SectionInputs,
} from "../Components/NewBookStyle";
import Select from "../Components/Inputs/Select";
import useForm from "../Hooks/useForm";
import { getBooks } from "../services/books";
import InputFile from "../Components/Inputs/ImgInput";

const NewBook = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getBooks().then((res) => {
      setData(res.data);
    });
  }, []);

  const title = useForm();
  const synopsis = useForm();
  const author = useForm();
  const genre = useForm();
  const entryDate = useForm();

  function selectGenre(e) {
    genre.onSelect(e);
  }

  if (data) {
    let filterGenre = data.reduce((items, currentItem) => {
      if (items.indexOf(currentItem.genre) < 0) {
        items.push(currentItem.genre);
      }
      return items;
    }, []);

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
            <InputFile />
            <ContainerInput style={{ gridArea: "titulo" }}>
              <Input
                onChange={title.onChange}
                value={title.value}
                type="text"
                id="input_title"
              />
              <LabelInput htmlFor="input_title">Título</LabelInput>
            </ContainerInput>
            <ContainerInput style={{ gridArea: "sinopse" }}>
              <TextArea
                onChange={synopsis.onChange}
                value={synopsis.value}
                id="input_sinopse"
              />
              <LabelInput htmlFor="input_sinopse">Sinopse</LabelInput>
            </ContainerInput>
            <ContainerInput style={{ gridArea: "autor" }}>
              <Input
                onChange={author.onChange}
                value={author.value}
                type="text"
                id="input_autor"
              />
              <LabelInput htmlFor="input_autor">Autor</LabelInput>
            </ContainerInput>
            <Select
              selectItem={selectGenre}
              list={filterGenre}
              value={genre.value}
              style={{ gridArea: "genero" }}
              labelStyle={"#133052"}
              label={"Gênero"}
            />
            <ContainerInput style={{ gridArea: "data" }}>
              <Input
                value={entryDate.value}
                onChange={entryDate.onChange}
                type="date"
                id="input_data"
              />
              <LabelInput htmlFor="input_data">Data de entrada</LabelInput>
            </ContainerInput>
          </ContainerInputs>
          <ConitainerButtons>
            <ButtonCancel to="/home">Cancelar</ButtonCancel>
            <ButtonSave>Salvar</ButtonSave>
          </ConitainerButtons>
        </SectionInputs>
      </ContainerNewBook>
    );
  } else return null;
};

export default NewBook;
