import React from "react";
import HistoryLoans from "../../components/Table";
import { UserContext } from "../../UserContext";
import NavBack from "../../components/NavBack";

const History = () => {
  const { history } = React.useContext(UserContext);

  return (
    <>
      <NavBack path=".." page="Histórico de empréstimos" />
      <HistoryLoans bookTitle={true} loans={history} />
    </>
  );
};

export default History;
