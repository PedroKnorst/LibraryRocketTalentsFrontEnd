import React from "react";
import { NavBack, NavBackHome, NavBackPage } from "../Components/NavBack";
import { ReactComponent as Back } from "../assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";
import { getBooks, postBook } from "../services/books";
import {
  ButtonInputSearch,
  ContainerBook,
  ContainerBooksLibrary,
  ContainerInputsLibrary,
  ContainerLibrary,
  ContainerSearchLibrary,
  InputSearch,
  SectinoInputsLibrary,
} from "../Components/LibraryStyle";
import { ReactComponent as Search } from "../assets/svg/Caminho 263.svg";
import Select from "../Components/Inputs/Select";
import Livro1 from "../assets/livro01.png";

const Library = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const takeBooks = () => {
      getBooks().then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    };
    takeBooks();
  }, []);

  return (
    <ContainerLibrary>
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
            data.map((d) => (
              <ContainerBook key={d.title}>
                <img src={Livro1} alt={d.title} />
                <h2>{d.title}</h2>
              </ContainerBook>
            ))}
        </ContainerBooksLibrary>
      </SectinoInputsLibrary>
    </ContainerLibrary>
  );
};

export default Library;
