import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Server } from 'miragejs';
import React from 'react';
import { mockServer } from '../../miragejs/server';
import { UserBooksContext, UserBooksStorage, UserHistoryContext, UserHistoryStorage } from './UserContext';

describe('UserContext', () => {
  let server: Server;

  beforeEach(() => {
    server = mockServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should render 3 loans', async () => {
    server.createList('loan', 3);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UserHistoryStorage>{children}</UserHistoryStorage>
    );

    const useHistory = () => React.useContext(UserHistoryContext);

    const { result } = renderHook(() => useHistory(), { wrapper });

    await waitFor(() => {
      const history = result.current.history;

      expect(history).toHaveLength(3);
    });
  });

  it('should render 3 books', async () => {
    server.createList('book', 3);

    const wrapper = ({ children }: { children: React.ReactNode }) => <UserBooksStorage>{children}</UserBooksStorage>;

    const useHistory = () => React.useContext(UserBooksContext);

    const { result } = renderHook(() => useHistory(), { wrapper });

    await waitFor(() => {
      const books= result.current.books;

      expect(books).toHaveLength(3);
    });
  });
});
