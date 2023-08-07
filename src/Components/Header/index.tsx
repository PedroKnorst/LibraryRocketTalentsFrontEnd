import React from "react";
import Logo from "../../assets/svg/Logo";
import User from "../../assets/svg/User";
import { ArrowElement, DivUser, HeaderContainer, Logout } from "./style";
import Arrow from "../../assets/svg/Arrow.svg";

const Header = () => {
  const [active, setActive] = React.useState(false);

  return (
    <HeaderContainer>
      <Logo />
      <DivUser onClick={() => setActive((prevActive) => !prevActive)}>
        <User />
        <p>Usuário</p>
        <ArrowElement src={Arrow} active={`${active}`} />
        <Logout active={`${active}`} to="/login">
          Sair
        </Logout>
      </DivUser>
    </HeaderContainer>
  );
};

export default Header;
