import React from "react";
import {
  ButtonCancel,
  ButtonSave,
  ContainerButtons,
  ContainerInputs,
  ContainerNewBook,
  SectionInputs,
} from "../Components/NewBookStyle";
import Select from "../Components/Inputs/Select";
import useForm from "../Hooks/useForm";
import InputFile from "../Components/Inputs/InputImg";
import { Book, UserContext } from "../UserContext";
import InputText from "../Components/Inputs/InputText";
import NavHome from "../Components/NavBack";
import InputTextArea from "../Components/Inputs/TexArea";

const NewBook = () => {
  const { books } = React.useContext(UserContext);

  const title = useForm("");
  const synopsis = useForm("");
  const author = useForm("");
  const genre = useForm("");
  const entryDate = useForm("");

  const filterGenre = books.reduce((items: string[], currentItem: Book) => {
    if (currentItem.genre) {
      if (items.indexOf(currentItem.genre) < 0) {
        items.push(currentItem.genre);
      }
    }
    return items;
  }, []);

  return (
    <ContainerNewBook>
      <NavHome path="/home" page="Cadastrar novo livro" />
      <SectionInputs>
        <ContainerInputs>
          <InputFile />
          <InputText
            gridArea={{ gridArea: "titulo" }}
            id="input_title"
            label="Títutlo"
            onChange={title.onChange}
            value={title.value}
            type="text"
            error={title.error}
          />
          <InputTextArea
            gridArea={{ gridArea: "sinopse" }}
            id="input_synopsis"
            label="Sinopse"
            onChange={synopsis.onChange}
            value={synopsis.value}
            error={synopsis.error}
          />
          <InputText
            gridArea={{ gridArea: "autor" }}
            id="input_author"
            label="Autor"
            onChange={author.onChange}
            value={author.value}
            type="text"
            error={author.error}
          />
          <Select
            selectItem={(e) => genre.onSelect(e)}
            list={filterGenre}
            value={genre.value}
            style={{ gridArea: "genero" }}
            labelStyle={"#133052"}
            label={"Gênero"}
          />
          <InputText
            gridArea={{ gridArea: "data" }}
            id="input_date"
            label="Data de entrada"
            onChange={entryDate.onChange}
            value={entryDate.value}
            type="date"
            error={entryDate.error}
          />
        </ContainerInputs>
        <ContainerButtons>
          <ButtonCancel to="/home">Cancelar</ButtonCancel>
          <ButtonSave>Salvar</ButtonSave>
        </ContainerButtons>
      </SectionInputs>
    </ContainerNewBook>
  );
};

export default NewBook;
