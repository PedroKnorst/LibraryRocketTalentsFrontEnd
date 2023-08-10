import { NavHomeContainer, NavHomeIcon, NavHomeLi, NavHomeText } from "./style";
import IconNewBook from "../../assets/svg/IconNewBook";
import IconLibrary from "../../assets/svg/IconLibrary";
import IconHistory from "../../assets/svg/IconHistory";

const NavHome = () => {
  return (
    <NavHomeContainer>
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
    </NavHomeContainer>
  );
};

export default NavHome;
