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
import InputFile from "../Components/Inputs/ImgInput";
import {
  ContainerInput,
  Input,
  LabelInput,
  TextArea,
} from "../Components/Inputs/Input";
import Select from "../Components/Inputs/Select";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, getBooks, putBook } from "../services/books";
import useForm from "../Hooks/useForm";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = React.useState(null);
  const [data, setData] = React.useState(null);
  const title = useForm();
  const synopsis = useForm();
  const author = useForm();
  const genre = useForm();
  const entryDate = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    getBook(id).then((res) => {
      setBook(res.data);
    });

    getBooks().then((res) => {
      setData(res.data);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    putBook(id, {
      ...book,
      title: title.value,
      author: author.value,
      genre: genre.value,
      synopsis: synopsis.value,
      systemEntryDate: entryDate,
    }).then((res) => res.data);

    return navigate("../biblioteca");
  };

  const selectGenre = (e) => {
    genre.onSelect(e);
  };

  if (book && data) {
    let filterGenre = data.reduce((items, currentItem) => {
      if (items.indexOf(currentItem.genre) < 0) {
        items.push(currentItem.genre);
      }
      return items;
    }, []);

    return (
      <ContainerNewBook>
        <NavBack>
          <NavBackHome to="/home/biblioteca">
            <Back /> Biblioteca
          </NavBackHome>
          <NavBackPage>/ Editar livro</NavBackPage>
        </NavBack>
        <SectionInputs onSubmit={handleSubmit}>
          <ContainerInputs>
            <InputFile cover={book.image} />
            <ContainerInput style={{ gridArea: "titulo" }}>
              <Input
                onChange={title.onChange}
                value={title.value ? title.value : book.title}
                type="text"
                id="input_title"
              />
              <LabelInput htmlFor="input_title">Título</LabelInput>
            </ContainerInput>
            <ContainerInput style={{ gridArea: "sinopse" }}>
              <TextArea
                onChange={synopsis.onChange}
                value={synopsis.value ? synopsis.value : book.synopsis}
                id="input_sinopse"
              />
              <LabelInput htmlFor="input_sinopse">Sinopse</LabelInput>
            </ContainerInput>
            <ContainerInput style={{ gridArea: "autor" }}>
              <Input
                onChange={author.onChange}
                value={author.value ? author.value : book.author}
                type="text"
                id="input_autor"
              />
              <LabelInput htmlFor="input_autor">Autor</LabelInput>
            </ContainerInput>
            <Select
              selectItem={selectGenre}
              list={filterGenre}
              value={genre.value ? genre.value : book.genre}
              style={{ gridArea: "genero" }}
              labelStyle={"#133052"}
              label={"Gênero"}
            />
            <ContainerInput style={{ gridArea: "data" }}>
              <Input
                onChange={entryDate.onChange}
                value={entryDate.value ? entryDate.value : book.systemEntryDate}
                type="date"
                id="input_data"
              />
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
  } else return null;
};

export default EditBook;
