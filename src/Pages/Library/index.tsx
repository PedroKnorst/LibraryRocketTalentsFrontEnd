import React from "react";
import {
  ButtonInputSearch,
  ContainerBooksLibrary,
  ContainerInputsLibrary,
  ContainerLibrary,
  ContainerSearchLibrary,
  InputSearch,
  SectinoInputsLibrary,
} from "./style";
import Search from "../../assets/svg/Search";
import Select from "../../components/Inputs/Select";
import BookContent from "../../components/modal/ModalBook";
import { UserContext } from "../../UserContext";
import { Route, Routes } from "react-router-dom";
import BookDataBorrow from "../../components/modal/BookDataBorrow";
import BookDataInactive from "../../components/modal/BookDataInactive";
import useForm from "../../hooks/useForm";
import { Book } from "../../interfaces/book";
import NavBack from "../../components/NavBack";
import BookHistory from "../../components/modal/BookHistory";
import ContainerBook from "../../components/CardBook";

const Library = () => {
  const [search, setSearch] = React.useState("");
  const { books } = React.useContext(UserContext);
  const [newBooks, setNewBooks] = React.useState<Book[]>(books);
  const category = useForm();
  const categorys = ["Autor", "Gênero", "Data de Entrada"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchBook = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filteredBooks = books.filter((book) =>
      book.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchBook)
    );

    setNewBooks(filteredBooks);
  };

  const selectItem = (e: React.PointerEvent<HTMLElement>) => {
    category.onSelect(e);

    function converterData(dataString: string) {
      const partes = dataString.split("/");
      const dia = parseInt(partes[0]);
      const mes = parseInt(partes[1]) - 1;
      const ano = parseInt(partes[2]);
      return new Date(ano, mes, dia);
    }

    if (e.currentTarget.textContent === "Gênero") {
      newBooks.sort((a, b) => (a.genre < b.genre ? -1 : 1));
    } else if (e.currentTarget.textContent === "Autor") {
      newBooks.sort((a, b) => (a.author < b.author ? -1 : 1));
    } else if (e.currentTarget.textContent === "Data de Entrada") {
      newBooks.sort(
        (a, b) =>
          converterData(b.systemEntryDate).getTime() -
          converterData(a.systemEntryDate).getTime()
      );
    }
    setNewBooks(newBooks);
  };

  const defaultItem = () => {
    category.setValue("");

    newBooks.sort((a, b) => {
      if (a.id && b.id) return Number.parseInt(a.id) - Number.parseInt(b.id);
      return -1;
    });

    setNewBooks(newBooks);
  };

  if (newBooks)
    return (
      <ContainerLibrary>
        <Routes>
          <Route path="livro/:id" element={<BookContent />} />
          <Route path="emprestar/:id" element={<BookDataBorrow />} />
          <Route path="inativar/:id" element={<BookDataInactive />} />
          <Route path="historico/:id" element={<BookHistory />} />
        </Routes>
        <NavBack path="/home" page="Biblioteca" />
        <SectinoInputsLibrary>
          <ContainerInputsLibrary>
            <ContainerSearchLibrary onSubmit={searchBook}>
              <label htmlFor="search">
                <Search />
              </label>
              <InputSearch
                onChange={handleChange}
                value={search}
                type="text"
                id="search"
                placeholder="Pesquisar livro..."
              />
              <ButtonInputSearch>Buscar</ButtonInputSearch>
            </ContainerSearchLibrary>
            <Select
              mediaquerie="false"
              defaultItem={defaultItem}
              selectItem={selectItem}
              list={categorys}
              value={category.value}
              labelStyle={"#ADB5BD"}
              selectStyle={{ borderColor: "#ADB5BD" }}
              label={"Filtrar"}
            />
          </ContainerInputsLibrary>
          <ContainerBooksLibrary>
            {newBooks &&
              newBooks.map((book: Book) => (
                <ContainerBook key={book.id} data={book} />
              ))}
          </ContainerBooksLibrary>
        </SectinoInputsLibrary>
      </ContainerLibrary>
    );
  else return null;
};

export default Library;
