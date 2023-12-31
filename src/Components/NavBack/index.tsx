import Back from "../../assets/svg/Back";
import { NavBackContainer, NavBackHome, NavBackPage } from "./style";

interface Props {
  page: string;
  path: string;
}

const NavBack = ({ page, path }: Props) => {
  return (
    <NavBackContainer data-testid='navBackContainer'>
      <NavBackHome data-testid='buttonNavBack' to={path}>
        <Back /> Home
      </NavBackHome>
      <NavBackPage>/ {page}</NavBackPage>
    </NavBackContainer>
  );
};

export default NavBack;
