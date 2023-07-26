import React from "react";
import { NavBack, NavBackHome, NavBackPage } from "../Components/NavBack";
import { ReactComponent as Back } from "../Assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";

const Library = () => {
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
