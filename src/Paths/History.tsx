import React from "react";
import HistoryLoans from "../Components/Table";
import { UserContext } from "../UserContext";
import NavBack from "../Components/NavBack";

const History = () => {
  const { history } = React.useContext(UserContext);

  return (
    <>
      <NavBack path="/home" page="Histórico de empréstimos" />
      <HistoryLoans bookTitle={true} loans={history} />
    </>
  );
};

export default History;
