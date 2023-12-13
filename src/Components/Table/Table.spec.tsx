import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoryLoans from '.';

const loans = [
  {
    bookTitle: 'Titulo 1',
    studentName: 'Aluno 1',
    class: 'T01',
    withdrawalDate: '23/02/2020',
    deliveryDate: '25/02/2020',
  },
  {
    bookTitle: 'Titulo 2',
    studentName: 'Aluno 2',
    class: 'T02',
    withdrawalDate: '25/02/2020',
    deliveryDate: '27/02/2020',
  },
  {
    bookTitle: 'Titulo 3',
    studentName: 'Aluno 3',
    class: 'T03',
    withdrawalDate: '27/02/2020',
    deliveryDate: '01/03/2020',
  },
];

describe('<HistoryLoans />', () => {
  beforeEach(() => {
    render(<HistoryLoans bookTitle loans={loans} />);
  });
  it('should render the component', () => {
    const historyElement = screen.getByTestId('historyContainer');

    expect(historyElement).toBeInTheDocument();
  });

  // it('should render three lines of loans', () => {
  //   const loanLines = screen.getAllByTestId('loanLine');

  //   expect(loanLines).toHaveLength(3);
  //   expect(loanLines[0]).toBeInTheDocument();
  //   expect(loanLines[1]).toBeInTheDocument();
  //   expect(loanLines[2]).toBeInTheDocument();
  // });

  it.todo('should filter the lines for students names to be in alphabetic order');
  it.todo('should filter the lines for classes to be in crescent order');
  it.todo('should filter the lines for books names to be in alphabetic order');
  it.todo('should filter the lines for withdrawal dates to be in calendar order');
  it.todo('should filter the lines for delivery dates to be in calendar order');
  it.todo('should not render the column of book names when propriety bookTitle is false');
});
