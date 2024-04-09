import React from 'react';
import HistoryLoans from '../../components/Table';
import { UserHistoryContext } from '../../context/UserContext';
import NavBack from '../../components/NavBack';

const History = () => {
  const { history } = React.useContext(UserHistoryContext);

  console.log('ola');

  return (
    <div data-testid="history">
      <NavBack path=".." page="Histórico de empréstimos" />
      <HistoryLoans bookTitle={true} loans={history} />
    </div>
  );
};

export default History;
