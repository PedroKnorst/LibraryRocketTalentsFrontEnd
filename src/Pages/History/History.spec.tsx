import { render, screen } from '@testing-library/react';
import History from '.';
import { UserHistoryContext } from '../../context/UserContext';
import { Loan } from '../../interfaces/history';
import { BrowserRouter } from 'react-router-dom';

describe('<HistoryLoans />', () => {
  it('rendering component', () => {
    const userHistoryContextMock: Loan[] = [
      {
        bookTitle: 'Title',
        studentName: 'Pedro',
        class: 'T32',
        withdrawalDate: '23/02/2005',
        deliveryDate: '02/03/2005',
      },
    ];
    render(
      <UserHistoryContext.Provider value={{ history: userHistoryContextMock }}>
        <BrowserRouter>
          <History />
        </BrowserRouter>
      </UserHistoryContext.Provider>
    );

    expect(screen.getByTestId('history')).toBeTruthy();
  });
});
