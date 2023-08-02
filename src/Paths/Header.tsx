import React from "react";
import { ReactComponent as Logo } from "../assets/svg/Logo.svg";
import { ReactComponent as User } from "../assets/svg/person_black_24dp (1).svg";
import {
  ArrowElement,
  DivUser,
  HeaderContainer,
  Logout,
} from "../Components/Header/HeaderContainer";

const Header = () => {
  const [active, setActive] = React.useState(false);

  return (
    <HeaderContainer>
      <Logo />
      <DivUser onClick={() => setActive((prevActive) => !prevActive)}>
        <User />
        <p>Usuário</p>
        <ArrowElement active={`${active}`} />
        <Logout active={`${active}`} to="/login">
          Sair
        </Logout>
      </DivUser>
    </HeaderContainer>
  );
};

export default Header;
