import React from 'react';
import { Loan } from '../../interfaces/history';
import { FilterButton, TableLoans, TbodyLoans, TheadLoans, ContainerTable } from './style';
import Filter from '../../assets/svg/Filter';

interface Props {
  loans: Loan[];
  bookTitle: boolean;
}

const SortOrder = {
  Ascending: 'asc',
  Descending: 'desc',
};

const HistoryLoans = ({ loans, bookTitle }: Props) => {
  const [data, setData] = React.useState(loans);
  const [sortOrder, setSortOrder] = React.useState(SortOrder.Ascending);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending);
  };

  const sortStudent = () => {
    toggleSortOrder();

    const sortedStudent = loans.sort((a, b) => {
      if (a.studentName === b.studentName) return 0;
      return sortOrder === SortOrder.Ascending
        ? a.studentName < b.studentName
          ? -1
          : 1
        : a.studentName > b.studentName
        ? -1
        : 1;
    });

    setData(sortedStudent);
  };

  const sortClass = () => {
    toggleSortOrder();

    const sortedClass = loans.sort((a, b) => {
      if (a.class === b.class) return 0;
      return sortOrder === SortOrder.Ascending ? (a.class < b.class ? -1 : 1) : a.class > b.class ? -1 : 1;
    });

    setData(sortedClass);
  };

  const sortBook = () => {
    toggleSortOrder();

    const sortedBook = loans.sort((a, b) => {
      if (a.bookTitle === b.bookTitle) return 0;
      if (a.bookTitle && b.bookTitle)
        return sortOrder === SortOrder.Ascending
          ? a.bookTitle < b.bookTitle
            ? -1
            : 1
          : a.bookTitle > b.bookTitle
          ? -1
          : 1;
      return 0;
    });

    setData(sortedBook);
  };

  const sortWithdrawalDate = () => {
    toggleSortOrder();

    const sortedDate = loans.sort((a, b) => {
      if (a.withdrawalDate === b.withdrawalDate) return 0;
      return sortOrder === SortOrder.Ascending
        ? a.withdrawalDate < b.withdrawalDate
          ? -1
          : 1
        : a.withdrawalDate > b.withdrawalDate
        ? -1
        : 1;
    });

    setData(sortedDate);
  };

  const sortDeliveryDate = () => {
    toggleSortOrder();

    const sortedDate = loans.sort((a, b) => {
      if (a.deliveryDate === b.deliveryDate) return 0;
      return sortOrder === SortOrder.Ascending
        ? a.deliveryDate < b.deliveryDate
          ? -1
          : 1
        : a.deliveryDate > b.deliveryDate
        ? -1
        : 1;
    });

    setData(sortedDate);
  };

  return (
    <ContainerTable data-testid="historyContainer">
      <TableLoans>
        <TheadLoans>
          <tr>
            <th>Aluno</th>
            <th>Turma</th>
            {bookTitle && <th>Livro</th>}
            <th>Data da Retirada</th>
            <th>Data da Entrega</th>
          </tr>
        </TheadLoans>
        <TbodyLoans>
          <tr>
            <td>
              <FilterButton data-testid="sortStudent" onClick={sortStudent}>
                <Filter />
              </FilterButton>
            </td>
            <td>
              <FilterButton data-testid="sortClass" onClick={sortClass}>
                <Filter />
              </FilterButton>
            </td>
            {bookTitle && (
              <td>
                <FilterButton data-testid="sortBook" onClick={sortBook}>
                  <Filter />
                </FilterButton>
              </td>
            )}
            <td>
              <FilterButton data-testid="sortWithdrawalDate" onClick={sortWithdrawalDate}>
                <Filter />
              </FilterButton>
            </td>
            <td>
              <FilterButton data-testid="sortDeliveryDate" onClick={sortDeliveryDate}>
                <Filter />
              </FilterButton>
            </td>
          </tr>
          {data.map((loan, id) => (
            <tr key={id}>
              <td>{loan.studentName}</td>
              <td>{loan.class}</td>
              {bookTitle && <td>{loan.bookTitle}</td>}
              <td>{loan.withdrawalDate}</td>
              <td>{loan.deliveryDate}</td>
            </tr>
          ))}
        </TbodyLoans>
      </TableLoans>
    </ContainerTable>
  );
};

export default HistoryLoans;
