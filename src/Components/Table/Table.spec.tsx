import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoryLoans from '.';
import userEvent from '@testing-library/user-event';

const loans = [
  {
    bookTitle: 'A Revolução dos bichos',
    studentName: 'Pedro',
    class: 'T02',
    withdrawalDate: '25/02/2020',
    deliveryDate: '27/02/2020',
  },
  {
    bookTitle: 'Do mil ao 1 mihão',
    studentName: 'Douglas',
    class: 'T01',
    withdrawalDate: '23/02/2020',
    deliveryDate: '25/02/2020',
  },
  {
    bookTitle: 'Diário de um banana',
    studentName: 'Leo',
    class: 'T03',
    withdrawalDate: '27/02/2020',
    deliveryDate: '01/03/2020',
  },
];

describe('<HistoryLoans />', () => {
  beforeEach(() => {});

  it('should render the component', () => {
    render(<HistoryLoans bookTitle loans={loans} />);
    const historyElement = screen.getByTestId('historyContainer');

    expect(historyElement).toBeInTheDocument();
  });

  it('should render three lines of loans', () => {
    render(<HistoryLoans bookTitle loans={loans} />);
    const loanLines = screen.getAllByTestId('loanLine');

    expect(loanLines).toHaveLength(3);
    expect(loanLines[0]).toBeInTheDocument();
    expect(loanLines[1]).toBeInTheDocument();
    expect(loanLines[2]).toBeInTheDocument();
  });

  it('should order the lines for students names to be in alphabetic order when the button is clicked and to be in reverse order if it clicked again', async () => {
    render(<HistoryLoans bookTitle loans={loans} />);

    const sortStudentButton = screen.getByTestId('sortStudent');
    const loanLines = screen.getAllByTestId('loanLine');

    expect(loanLines[0]).toHaveTextContent('Pedro');

    await userEvent.click(sortStudentButton);

    expect(loanLines[0]).toHaveTextContent('Douglas');

    await userEvent.click(sortStudentButton);

    expect(loanLines[0]).toHaveTextContent('Pedro');
  });

  it('should order the lines for classes to be in crescent order when the button is clicked and to be in reverse order if it clicked again ', async () => {
    render(<HistoryLoans bookTitle loans={loans} />);

    const sortClassButton = screen.getByTestId('sortClass');
    const loanLines = screen.getAllByTestId('loanLine');

    expect(loanLines[0]).toHaveTextContent('T02');

    await userEvent.click(sortClassButton);

    expect(loanLines[0]).toHaveTextContent('T01');

    await userEvent.click(sortClassButton);

    expect(loanLines[0]).toHaveTextContent('T03');
  });

  it('should order the lines for book names to be in alphabetic order when the button is clicked and to be in reverse order if it clicked again', async () => {
    render(<HistoryLoans bookTitle loans={loans} />);

    const sortBookButton = screen.getByTestId('sortBook');
    const loanLines = screen.getAllByTestId('loanLine');

    expect(loanLines[0]).toHaveTextContent('Diário de um banana');

    await userEvent.click(sortBookButton);

    expect(loanLines[0]).toHaveTextContent('A Revolução dos bichos');

    await userEvent.click(sortBookButton);

    expect(loanLines[0]).toHaveTextContent('Do mil ao 1 mihão');
  });

  it('should order the lines for withdrawal dates to be in calendar order when the button is clicked and to be in reverse order if it clicked again', async () => {
    render(<HistoryLoans bookTitle loans={loans} />);

    const sortWithdrawalButton = screen.getByTestId('sortWithdrawalDate');
    const loanLines = screen.getAllByTestId('loanLine');

    expect(loanLines[0]).toHaveTextContent('23/02/2020');

    await userEvent.click(sortWithdrawalButton);

    expect(loanLines[0]).toHaveTextContent('23/02/2020');

    await userEvent.click(sortWithdrawalButton);

    expect(loanLines[0]).toHaveTextContent('27/02/2020');
  });

  it('should order the lines for delivery dates to be in calendar order when the button is clicked and to be in reverse order if it clicked again', async () => {
    render(<HistoryLoans bookTitle loans={loans} />);

    const sortDeliveryButton = screen.getByTestId('sortDeliveryDate');
    const loanLines = screen.getAllByTestId('loanLine');

    expect(loanLines[0]).toHaveTextContent('01/03/2020');

    await userEvent.click(sortDeliveryButton);

    expect(loanLines[0]).toHaveTextContent('25/02/2020');

    await userEvent.click(sortDeliveryButton);

    expect(loanLines[0]).toHaveTextContent('01/03/2020');
  });

  it('should not render the column of book names when propriety bookTitle is false', () => {
    render(<HistoryLoans loans={loans} />);

    const elementTitleBook = screen.queryByTestId('titleBook');
    const elementButtonBook = screen.queryByTestId('sortBook');

    expect(elementTitleBook).toBeNull();
    expect(elementButtonBook).toBeNull();
  });
});
