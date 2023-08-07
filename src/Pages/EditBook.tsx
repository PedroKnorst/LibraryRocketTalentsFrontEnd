import React from "react";
import {
  ButtonCancel,
  ButtonSave,
  ContainerButtons,
  ContainerInputs,
  ContainerNewBook,
  SectionInputs,
} from "../Components/NewBookStyle";
import InputFile from "../Components/Inputs/InputImg";
import Select from "../Components/Inputs/Select";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, putBook } from "../services/books";
import useForm from "../Hooks/useForm";
import { Book, UserContext } from "../UserContext";
import NavBack from "../Components/NavBack";
import InputText from "../Components/Inputs/InputText";
import InputTextArea from "../Components/Inputs/TexArea";

const EditBook = () => {
  const { id } = useParams();
  const { books } = React.useContext(UserContext);
  const [book, setBook] = React.useState<Book | null>(null);
  const title = useForm();
  const synopsis = useForm();
  const author = useForm();
  const genre = useForm();
  const entryDate = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id)
      getBook(id).then((res) => {
        setBook(res.data);
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (book && id)
      putBook(id, {
        ...book,
        title: title.value,
        author: author.value,
        genre: genre.value,
        synopsis: synopsis.value,
        systemEntryDate: entryDate.value,
      }).then((res) => res.data);

    return navigate("../biblioteca");
  };

  const filterGenre = books.reduce((items: string[], currentItem: Book) => {
    if (currentItem.genre)
      if (items.indexOf(currentItem.genre) < 0) {
        items.push(currentItem.genre);
      }
    return items;
  }, []);

  return (
    <ContainerNewBook>
      <NavBack path="/home/biblioteca" page="Editar Livro" />
      <SectionInputs onSubmit={handleSubmit}>
        <ContainerInputs>
          <InputFile cover={book?.image} />
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
          <ButtonCancel to="/home/biblioteca">Cancelar</ButtonCancel>
          <ButtonSave>Salvar</ButtonSave>
        </ContainerButtons>
      </SectionInputs>
    </ContainerNewBook>
  );
};

export default EditBook;
