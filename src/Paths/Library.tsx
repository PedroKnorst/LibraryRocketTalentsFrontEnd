import React from "react";
import {
  ButtonInputSearch,
  ContainerBooksLibrary,
  ContainerInputsLibrary,
  ContainerLibrary,
  ContainerSearchLibrary,
  InputSearch,
  SectinoInputsLibrary,
} from "../Components/LibraryStyle";
import Search from "../assets/svg/Search";
import Select from "../Components/Inputs/Select";
import ModalBook from "../Components/Modal/ModalBook";
import ContainerBook from "../Components/CardBook";
import { UserContext } from "../UserContext";
import { Route, Routes } from "react-router-dom";
import BookDataBorrow from "../Components/Modal/BookDataBorrow";
import BookDataInactive from "../Components/Modal/BookDataInactive";
import useForm from "../Hooks/useForm";
import { Book } from "../UserContext";
import NavBack from "../Components/NavBack";

const Library = () => {
  const { books } = React.useContext(UserContext);
  const category = useForm();
  const categorys = ["Autor", "Gênero", "Data"];

  if (books)
    return (
      <ContainerLibrary>
        <Routes>
          <Route path="livro/:id" element={<ModalBook />} />
          <Route path="emprestar/:id" element={<BookDataBorrow />} />
          <Route path="inativar/:id" element={<BookDataInactive />} />
        </Routes>
        <NavBack path="/home" page="Biblioteca" />
        <SectinoInputsLibrary>
          <ContainerInputsLibrary>
            <ContainerSearchLibrary>
              <label htmlFor="search">
                <Search />
              </label>
              <InputSearch
                type="text"
                id="search"
                placeholder="Pesquisar livro..."
              />
              <ButtonInputSearch>Buscar</ButtonInputSearch>
            </ContainerSearchLibrary>
            <Select
              selectItem={(e) => category.onSelect(e)}
              list={categorys}
              value={category.value}
              labelStyle={"#ADB5BD"}
              selectStyle={{ borderColor: "#ADB5BD" }}
              label={"Filtrar"}
            />
          </ContainerInputsLibrary>
          <ContainerBooksLibrary>
            {books &&
              books.map((book: Book) => (
                <ContainerBook
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  image={book.image}
                />
              ))}
          </ContainerBooksLibrary>
        </SectinoInputsLibrary>
      </ContainerLibrary>
    );
  else return null;
};

export default Library;
