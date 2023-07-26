import React from "react";
import { NavBack, NavBackHome, NavBackPage } from "../Components/NavBack";
import { ReactComponent as Back } from "../Assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";
import { getBooks, getUsers, postBook } from "../services/books";

const Library = () => {
  const takeBooks = () => {
    getBooks().then((res) => {
      console.log(res.data).catch((err) => {
        console.log(err);
      });
    });
  };

  const launchBooks = () => {
    postBook({
      title: "nao sei",
      author: "Dweck",
      genre: "locurada",
      status: {
        isActive: true,
        description: "",
      },
      image: "./assets/livro15.png",
      systemEntryDate: "22/09/2097",
      synopsis:
        "MuInteressantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.",
      rentHistory: [],
    }).then((res) => {
      console.log(res.data).catch((err) => {
        console.log(err);
      });
    });
  };

  React.useEffect(() => {
    takeBooks();
    // launchBooks();
  }, []);

  return (
    <>
      <NavBack>
        <NavBackHome to="/home">
          <Back /> Home
        </NavBackHome>
        <NavBackPage>/ Biblioteca</NavBackPage>
      </NavBack>
    </>
  );
};

export default Library;
