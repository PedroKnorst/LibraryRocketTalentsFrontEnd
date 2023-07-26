import React from "react";
import { NavBack, NavBackHome, NavBackPage } from "../Components/NavBack";
import { ReactComponent as Back } from "../Assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";
import { getBooks, postBook } from "../services/books";
import {
  ButtonInputSearch,
  ContainerBooksLibrary,
  ContainerInputsLibrary,
  ContainerLibrary,
  ContainerSearchLibrary,
  InputSearch,
  SectinoInputsLibrary,
} from "../Components/LibraryStyle";
import { ReactComponent as Search } from "../Assets/svg/Caminho 263.svg";
import Select from "../Components/Inputs/Select";

const Library = () => {
  const [data, setData] = React.useState(null);

  // const launchBooks = () => {
  //   postBook({
  //     title: "nao sei",
  //     author: "Dweck",
  //     genre: "locurada",
  //     status: {
  //       isActive: true,
  //       description: "",
  //     },
  //     image: "./assets/livro15.png",
  //     systemEntryDate: "22/09/2097",
  //     synopsis:
  //       "MuInteressantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.",
  //     rentHistory: [],
  //   }).then((res) => {
  //     console.log(res.data).catch((err) => {
  //       console.log(err);
  //     });
  //   });
  // };

  React.useEffect(() => {
    const takeBooks = () => {
      getBooks().then((res) => {
        setData(res.data);
        console.log(res.data).catch((err) => {
          console.log(err);
        });
      });
    };
    takeBooks();
    // launchBooks();
  }, []);

  if (data)
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
            {data.map((d) => (
              <div key={d.title}>{d.title}</div>
            ))}
          </ContainerBooksLibrary>
        </SectinoInputsLibrary>
      </ContainerLibrary>
    );
  else return null;
};

export default Library;
