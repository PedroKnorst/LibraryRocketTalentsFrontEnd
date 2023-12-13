import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Server } from 'miragejs';
import React from 'react';
import { mockServer } from '../../miragejs/server';
import { UserHistoryContext, UserHistoryStorage } from './UserContext';

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
      const history: any = result.current.history;

      expect(history.loans).toHaveLength(3);
    });
  });
});
