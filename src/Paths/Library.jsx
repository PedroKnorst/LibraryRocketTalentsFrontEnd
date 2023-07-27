import React from "react";
import { NavBack, NavBackHome, NavBackPage } from "../Components/NavBack";
import { ReactComponent as Back } from "../assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";
import { getBooks } from "../services/books";
import {
  ButtonInputSearch,
  ContainerBooksLibrary,
  ContainerInputsLibrary,
  ContainerLibrary,
  ContainerSearchLibrary,
  InputSearch,
  SectinoInputsLibrary,
} from "../Components/LibraryStyle";
import { ReactComponent as Search } from "../assets/svg/Caminho 263.svg";
import Select from "../Components/Inputs/Select";
import ModalBook from "../Components/Modal/ModalBook";
import ContainerBook from "../Components/CardBook/ContainerBook";

const Library = () => {
  const [data, setData] = React.useState(null);
  const [modal, setModal] = React.useState(null);

  React.useEffect(() => {
    getBooks().then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <ContainerLibrary>
      {modal && <ModalBook modal={modal} setModal={setModal} />}
      <NavBack>
        <NavBackHome to="/home">
          <Back /> Home
        </NavBackHome>
        <NavBackPage>/ Biblioteca</NavBackPage>
      </NavBack>
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
            labelstyle={"#ADB5BD"}
            selectstyle={{ borderColor: "#ADB5BD" }}
            label={"Filtrar"}
          />
        </ContainerInputsLibrary>
        <ContainerBooksLibrary>
          {data &&
            data.map((book) => (
              <ContainerBook key={book.id} book={book} setModal={setModal} />
            ))}
        </ContainerBooksLibrary>
      </SectinoInputsLibrary>
    </ContainerLibrary>
  );
};

export default Library;
