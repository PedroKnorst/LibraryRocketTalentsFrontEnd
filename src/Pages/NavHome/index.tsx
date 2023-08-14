import { NavHomeContainer, NavHomeIcon, NavHomeLi, NavHomeText } from "./style";
import IconNewBook from "../../assets/svg/IconNewBook";
import IconLibrary from "../../assets/svg/IconLibrary";
import IconHistory from "../../assets/svg/IconHistory";

const NavHome = () => {
  return (
    <NavHomeContainer>
      <NavHomeLi to="novo">
        <NavHomeIcon>
          <IconNewBook />
        </NavHomeIcon>
        <NavHomeText>
          <p>Cadastrar novo livro</p>
        </NavHomeText>
      </NavHomeLi>
      <NavHomeLi to="biblioteca">
        <NavHomeIcon>
          <IconLibrary />
        </NavHomeIcon>
        <NavHomeText>
          <p>Biblioteca</p>
        </NavHomeText>
      </NavHomeLi>
      <NavHomeLi to="historico">
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
