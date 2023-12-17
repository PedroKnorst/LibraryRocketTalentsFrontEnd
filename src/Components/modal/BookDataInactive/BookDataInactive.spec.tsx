import { render, renderHook, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Routes, MemoryRouter, Route } from 'react-router-dom';
import BookDataInactive from '.';
import { Server } from 'miragejs';
import { mockServer } from '../../../../miragejs/server';
import userEvent from '@testing-library/user-event';
import { UserBooksContext, UserBooksStorage } from '../../../context/UserContext';
import React from 'react';
import { Book } from '../../../interfaces/book';

describe('<BookDataInactive />', () => {
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
      <MemoryRouter initialEntries={[`/home/biblioteca/inativar/${book.id}`]}>
        <Routes>
          <Route path="/home/biblioteca/inativar/:id" element={<BookDataInactive dataTestId="inactiveBookModal" />} />
        </Routes>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    server.shutdown();
  });

  it('should render the component', async () => {
    await renderComponentWithServer();
    const inactiveBookModal = screen.getByTestId('inactiveBookModal');

    expect(inactiveBookModal).toBeInTheDocument();
  });

  it('should update the infos of the current book and make it inactive', async () => {
    await renderComponentWithServer();

    let book = await getBooksRequest();

    book.status.isActive = true;

    expect(book.status.isActive).toBe(true);

    const inactiveBookInput = screen.getByTestId('inactiveBookInput');
    const submitButton = screen.getByTestId('submitButton');

    await userEvent.type(inactiveBookInput, 'Desativado porque estragou');

    const errorInactive = screen.queryByTestId('errorInactive');

    expect(errorInactive).toBeNull();

    await userEvent.click(submitButton);

    book = await getBooksRequest();

    expect(book.status.isActive).toBe(false);
    expect(book.status.description).toBe('Desativado porque estragou');
  });
});
