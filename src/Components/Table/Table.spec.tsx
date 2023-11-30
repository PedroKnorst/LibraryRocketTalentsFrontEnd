import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoryLoans from '.';

const loans = [{ bookTitle: '', studentName: '', class: '', withdrawalDate: '', deliveryDate: '' }];

describe('<HistoryLoans />', () => {
  beforeEach(() => {
    render(<HistoryLoans bookTitle loans={loans} />);
  });

  it('should render the component', () => {
    const history = screen.getByTestId('historyContainer');

    expect(history).toBeInTheDocument();
  });
});
