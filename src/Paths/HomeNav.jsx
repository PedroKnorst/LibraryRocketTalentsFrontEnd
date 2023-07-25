import React from "react";
import "../App.css";
import {
  NavHome,
  NavHomeIcon,
  NavHomeLi,
  NavHomeText,
} from "../Components/NavHome";
import { ReactComponent as IconNewBook } from "../Assets/svg/add_circle_FILL0_wght400_GRAD0_opsz48.svg";
import { ReactComponent as IconLibrary } from "../Assets/svg/import_contacts_FILL0_wght400_GRAD0_opsz48 (1).svg";
import { ReactComponent as IconHistory } from "../Assets/svg/pending_actions_FILL0_wght400_GRAD0_opsz48.svg";

const HomeNav = () => {
  return (
    <NavHome>
      <NavHomeLi to="/home/novo">
        <NavHomeIcon>
          <IconNewBook />
        </NavHomeIcon>
        <NavHomeText>
          <p>Cadastrar novo livro</p>
        </NavHomeText>
      </NavHomeLi>
      <NavHomeLi to="/home/biblioteca">
        <NavHomeIcon>
          <IconLibrary />
        </NavHomeIcon>
        <NavHomeText>
          <p>Biblioteca</p>
        </NavHomeText>
      </NavHomeLi>
      <NavHomeLi to="/home/historico">
        <NavHomeIcon>
          <IconHistory />
        </NavHomeIcon>
        <NavHomeText>
          <p>Histórico de empréstimos</p>
        </NavHomeText>
      </NavHomeLi>
    </NavHome>
  );
};

export default HomeNav;
