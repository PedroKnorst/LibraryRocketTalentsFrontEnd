import React from "react";
import Logo from "../../assets/svg/Logo";
import User from "../../assets/svg/User";
import Arrow from "../../assets/svg/Arrow.svg";
import { ArrowElement, DivUser, HeaderContainer, Logout } from "./style";
import { useParams } from "react-router-dom";

const Header = () => {
  const { account } = useParams();
  const [active, setActive] = React.useState(false);

  return (
    <HeaderContainer>
      <Logo />
      <DivUser onClick={() => setActive((prevActive) => !prevActive)}>
        <User />
        <p>{account}</p>
        <ArrowElement src={Arrow} active={`${active}`} />
        <Logout active={`${active}`} to="/">
          Sair
        </Logout>
      </DivUser>
    </HeaderContainer>
  );
};

export default Header;
