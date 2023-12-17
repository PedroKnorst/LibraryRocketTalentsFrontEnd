import { render, renderHook, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BookIsBorrowed from '.';
import { Server } from 'miragejs';
import React from 'react';
import { UserBooksContext, UserBooksStorage } from '../../../context/UserContext';
import { Book } from '../../../interfaces/book';
import { mockServer } from '../../../../miragejs/server';
import userEvent from '@testing-library/user-event';

describe('<BookIsBorrowed />', () => {
  window.alert = jest.fn();
  const reloadContent = jest.fn();

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

    render(<BookIsBorrowed reloadContent={reloadContent} data={book} dataTestId="bookIsBorrowedModal" />, {
      wrapper: BrowserRouter,
    });
  };

  afterEach(() => {
    server.shutdown();
  });

  it('should render the component', async () => {
    await renderComponentWithServer();

    const bookIsBorrowedModal = screen.getByTestId('bookIsBorrowedModal');

    expect(bookIsBorrowedModal).toBeInTheDocument();
  });

  it('should change the status of book to isBorrowed false', async () => {
    await renderComponentWithServer();

    let book = await getBooksRequest();

    book.isBorrowed = true;

    expect(book.isBorrowed).toBe(true);

    const submitButton = screen.getByTestId('submitButton');

    await userEvent.click(submitButton);

    book = await getBooksRequest();

    expect(book.isBorrowed).toBe(false);
  });
});
