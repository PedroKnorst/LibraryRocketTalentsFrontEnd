import { render, renderHook, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoryLoans from '.';
import { mockServer } from '../../../miragejs/server';
import { Server } from 'miragejs';
import { UserHistoryContext, UserHistoryStorage } from '../../context/UserContext';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<HistoryLoans />', () => {
  let server: Server;

  beforeEach(() => {
    server = mockServer({ environment: 'test' });

    const loans = server.createList('loan', 3);

    const useHistory = () => React.useContext(UserHistoryContext);

    const {
      result: {
        current: { history },
      },
    } = renderHook(() => useHistory());

    render(<HistoryLoans bookTitle loans={history} />);
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should render the component', () => {
    const history = screen.getByTestId('historyContainer');

    screen.debug(history);

    expect(history).toBeInTheDocument();
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
