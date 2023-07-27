import React from "react";
import { NavBack, NavBackHome, NavBackPage } from "../Components/NavBack";
import { ReactComponent as Back } from "../assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";
import HistoryLoans, {
  ContainerHistoryLoans,
} from "../Components/HistoryStyle";

const History = () => {
  return (
    <ContainerHistoryLoans>
      <NavBack>
        <NavBackHome to="/home">
          <Back /> Home
        </NavBackHome>
        <NavBackPage>/ Histórico de empréstimos</NavBackPage>
      </NavBack>
      <HistoryLoans />
    </ContainerHistoryLoans>
  );
};

export default History;
