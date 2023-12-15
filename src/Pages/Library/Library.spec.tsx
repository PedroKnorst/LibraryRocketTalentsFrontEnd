/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Library from '.';
import { UserBooksContext, UserBooksStorage } from '../../context/UserContext';
import React from 'react';
import { mockServer } from '../../../miragejs/server';
import { Server } from 'miragejs';
import userEvent from '@testing-library/user-event';

const renderComponent = (server: Server) => {
  server.createList('book', 3);

  const wrapper = ({ children }: { children: React.ReactNode }) => <UserBooksStorage>{children}</UserBooksStorage>;

  const useBooks = () => React.useContext(UserBooksContext);

  const { result } = renderHook(() => useBooks(), { wrapper });

  return result;
};

describe('<Library />', () => {
  let server: Server;

  beforeEach(() => {
    server = mockServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should render the component', async () => {
    const result = renderComponent(server);

    await waitFor(() => {
      const books: any = result.current.books;
      render(
        <BrowserRouter>
          <UserBooksContext.Provider value={{ books: books.books }}>
            <Library />
          </UserBooksContext.Provider>
        </BrowserRouter>
      );
    });
    const libraryElement = screen.getByTestId('containerLibrary');

    screen.debug(libraryElement);

    expect(libraryElement).toBeInTheDocument();
  });

  it('should call the search function', async () => {
    const result = renderComponent(server);

    let books: any;

    await waitFor(() => {
      books = result.current.books;

      render(
        <BrowserRouter>
          <UserBooksContext.Provider value={{ books: books.books }}>
            <Library />
          </UserBooksContext.Provider>
        </BrowserRouter>
      );
    });

    const searchBookInput = screen.getByTestId('searchBookInput');

    fireEvent.change(searchBookInput, { target: { value: books.books[0].title } });

    const searchBookButton = screen.getByTestId('searchBookButton');

    fireEvent.click(searchBookButton);

    const bookElement = screen.getAllByTestId('book');

    expect(bookElement).toHaveLength(1);
  });

  it('should call the filter select function to order books by autor', async () => {
    const result = renderComponent(server);

    let books: any;

    await waitFor(() => {
      books = result.current.books;

      render(
        <BrowserRouter>
          <UserBooksContext.Provider value={{ books: books.books }}>
            <Library />
          </UserBooksContext.Provider>
        </BrowserRouter>
      );
    });

    const filterSelectField = screen.getByTestId('filterSelectField');

    await userEvent.click(filterSelectField);

    const filterSelectItem = screen.getAllByTestId('filterSelectItem');

    await userEvent.click(filterSelectItem[0]);

    const filterSelectInput = screen.getByTestId('filterSelectInput');

    expect(filterSelectInput).toHaveValue('Autor');
  });

  it('should call the filter select function to order books by gender', async () => {
    const result = renderComponent(server);

    let books: any;

    await waitFor(() => {
      books = result.current.books;

      render(
        <BrowserRouter>
          <UserBooksContext.Provider value={{ books: books.books }}>
            <Library />
          </UserBooksContext.Provider>
        </BrowserRouter>
      );
    });

    const filterSelectField = screen.getByTestId('filterSelectField');

    await userEvent.click(filterSelectField);

    const filterSelectItem = screen.getAllByTestId('filterSelectItem');

    await userEvent.click(filterSelectItem[1]);

    const filterSelectInput = screen.getByTestId('filterSelectInput');

    expect(filterSelectInput).toHaveValue('Gênero');
  });

  it('should call the filter select function to order books by entryDate', async () => {
    const result = renderComponent(server);

    let books: any;

    await waitFor(() => {
      books = result.current.books;

      render(
        <BrowserRouter>
          <UserBooksContext.Provider value={{ books: books.books }}>
            <Library />
          </UserBooksContext.Provider>
        </BrowserRouter>
      );
    });

    const filterSelectField = screen.getByTestId('filterSelectField');

    await userEvent.click(filterSelectField);

    const filterSelectItem = screen.getAllByTestId('filterSelectItem');

    await userEvent.click(filterSelectItem[2]);

    const filterSelectInput = screen.getByTestId('filterSelectInput');

    expect(filterSelectInput).toHaveValue('Data de Entrada');
  });

  it('should call the filter select function to set the books to default order', async () => {
    const result = renderComponent(server);

    let books: any;

    await waitFor(() => {
      books = result.current.books;

      render(
        <BrowserRouter>
          <UserBooksContext.Provider value={{ books: books.books }}>
            <Library />
          </UserBooksContext.Provider>
        </BrowserRouter>
      );
    });

    const filterSelectField = screen.getByTestId('filterSelectField');

    await userEvent.click(filterSelectField);

    const filterSelectItem = screen.getByTestId('filterSelectItemDefault');

    await userEvent.click(filterSelectItem);

    const filterSelectInput = screen.getByTestId('filterSelectInput');

    expect(filterSelectInput).toHaveValue('');
  });
});
