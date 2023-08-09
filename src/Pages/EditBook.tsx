import React from "react";
import {
  ButtonCancel,
  ButtonSave,
  ContainerButtons,
  ContainerInputs,
  ContainerNewBook,
  SectionInputs,
} from "../components/NewBook/style";
import InputFile from "../components/Inputs/InputFile";
import Select from "../components/Inputs/Select";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, putBook } from "../services/books";
import useForm from "../hooks/useForm";
import { Book } from "../interfaces/book";
import { UserContext } from "../UserContext";
import NavBack from "../components/NavBack";
import InputText from "../components/Inputs/InputText";
import InputTextArea from "../components/Inputs/TexArea";

const EditBook = () => {
  const { id } = useParams();
  const { books } = React.useContext(UserContext);
  const [book, setBook] = React.useState<Book | null>(null);
  const [img, setImg] = React.useState<string | ArrayBuffer | null>("");
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

  const infoChange = (i: string | ArrayBuffer | null) => {
    setImg(i);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (book && id) {
      title.setValue(book.title);
      putBook(id, {
        ...book,
        title: title.value,
        author: author.value,
        genre: genre.value,
        synopsis: synopsis.value,
        systemEntryDate: entryDate.value,
      }).then((res) => res.data);
    }

    navigate("../biblioteca");
    location.reload();
    alert("Livro editado com sucesso!");
  };

  const filterGenre = books.reduce((items: string[], currentItem: Book) => {
    if (currentItem.genre)
      if (items.indexOf(currentItem.genre) < 0) {
        items.push(currentItem.genre);
      }
    return items;
  }, []);

  const defaultItem = () => {
    genre.setValue("");
  };

  if (book)
    return (
      <ContainerNewBook>
        <NavBack path="/home/biblioteca" page="Editar Livro" />
        <SectionInputs onSubmit={handleSubmit}>
          <ContainerInputs>
            <InputFile img={img} setImg={infoChange} cover={book.image} />
            <InputText
              gridArea={{ gridArea: "titulo" }}
              id="input_title"
              label="Títutlo"
              onChange={title.onChange}
              value={book.title}
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
              defaultItem={defaultItem}
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
