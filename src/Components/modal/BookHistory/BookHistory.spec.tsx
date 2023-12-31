import { render, renderHook, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BookHistory from '.';
import { UserBooksContext, UserBooksStorage } from '../../../context/UserContext';
import React from 'react';
import { Book } from '../../../interfaces/book';
import { mockServer } from '../../../../miragejs/server';
import { Server } from 'miragejs';

describe('<BookHistory />', () => {
  let server: Server;

  const getBooksRequest = async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <UserBooksStorage>{children}</UserBooksStorage>;

    const useHistory = () => React.useContext(UserBooksContext);

    const { result } = renderHook(() => useHistory(), { wrapper });

    let books: Book[] = [];

    await waitFor(() => {
      books = result.current.books;
    });

    return books?.[0];
  };

  const renderComponentWithServer = async () => {
    server = mockServer({ environment: 'test' });

    server.createList('book', 1);

    const book = await getBooksRequest();

    render(
      <MemoryRouter initialEntries={[`/home/biblioteca/historico/${book.id}`]}>
        <Routes>
          <Route path="/home/biblioteca/historico/:id" element={<BookHistory dataTestId="historyBookModal" />} />
        </Routes>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    server.shutdown();
  });

  it('should render the component', async () => {
    await renderComponentWithServer();

    const historyModal = screen.getByTestId('historyBookModal');

    expect(historyModal).toBeInTheDocument();
  });

  it('should render the table of history', async () => {
    await renderComponentWithServer();

    const historyTable = screen.getByTestId('historyContainer');

    expect(historyTable).toBeInTheDocument();
  });
});
