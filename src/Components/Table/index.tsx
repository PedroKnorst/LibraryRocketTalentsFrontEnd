import { Loan } from "../../UserContext";
import { FilterButton, TableLoans, TbodyLoans, TheadLoans } from "./style";

interface Props {
  loans: Loan[];
  bookTitle: boolean;
}

const HistoryLoans = ({ loans, bookTitle }: Props) => {
  return (
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
            <FilterButton />
          </td>
          <td>
            <FilterButton />
          </td>
          <td>
            <FilterButton />
          </td>
          <td>
            <FilterButton />
          </td>
          <td>
            <FilterButton />
          </td>
        </tr>
        {loans.map((loan, id) => (
          <tr key={id}>
            <td>{loan.studentName}</td>
            <td>{loan.class}</td>
            {bookTitle && <td>{loan.book}</td>}
            <td>{loan.withdrawalDate}</td>
            <td>{loan.deliveryDate}</td>
          </tr>
        ))}
      </TbodyLoans>
    </TableLoans>
  );
};

export default HistoryLoans;
