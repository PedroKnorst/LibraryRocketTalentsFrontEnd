import '@testing-library/jest-dom';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Library from '.';
import { UserBooksContext, UserBooksStorage } from '../../context/UserContext';
import React from 'react';
import { mockServer } from '../../../miragejs/server';
import { Server } from 'miragejs';
import userEvent from '@testing-library/user-event';
import { Book } from '../../interfaces/book';

describe('<Library />', () => {
  let server: Server;

  const getBooksRequest = async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <UserBooksStorage>{children}</UserBooksStorage>;

    const useHistory = () => React.useContext(UserBooksContext);

    const { result } = renderHook(() => useHistory(), { wrapper });

    let books: Book[] = [];

    await waitFor(() => {
      books = result.current.books;
    });

    return books;
  };

  const renderComponentWithServer = async () => {
    server = mockServer({ environment: 'test' });

    server.createList('book', 5);

    const books = await getBooksRequest();

    render(
      <UserBooksContext.Provider value={{ books: books }}>
        <Library />
      </UserBooksContext.Provider>,
      { wrapper: BrowserRouter }
    );
  };

  afterEach(() => {
    server.shutdown();
  });

  it('should render the component', async () => {
    await renderComponentWithServer();

    const libraryElement = screen.getByTestId('containerLibrary');

    expect(libraryElement).toBeInTheDocument();
  });

  it('should call the search function', async () => {
    await renderComponentWithServer();

    const books = await getBooksRequest();

    const searchBookInput = screen.getByTestId('searchBookInput');

    fireEvent.change(searchBookInput, { target: { value: books[0].title } });

    const searchBookButton = screen.getByTestId('searchBookButton');

    fireEvent.click(searchBookButton);

    const bookElement = screen.getAllByTestId('book');

    expect(bookElement).toHaveLength(1);
  });

  it('should call the filter select function to order books by autor', async () => {
    await renderComponentWithServer();

    const filterSelectField = screen.getByTestId('filterSelectField');

    await userEvent.click(filterSelectField);

    const filterSelectItem = screen.getAllByTestId('filterSelectItem');

    await userEvent.click(filterSelectItem[0]);

    const filterSelectInput = screen.getByTestId('filterSelectInput');

    expect(filterSelectInput).toHaveValue('Autor');
  });

  it('should call the filter select function to order books by gender', async () => {
    await renderComponentWithServer();

    const filterSelectField = screen.getByTestId('filterSelectField');

    await userEvent.click(filterSelectField);

    const filterSelectItem = screen.getAllByTestId('filterSelectItem');

    await userEvent.click(filterSelectItem[1]);

    const filterSelectInput = screen.getByTestId('filterSelectInput');

    expect(filterSelectInput).toHaveValue('Gênero');
  });

  it('should call the filter select function to order books by entryDate', async () => {
    await renderComponentWithServer();

    const filterSelectField = screen.getByTestId('filterSelectField');

    await userEvent.click(filterSelectField);

    const filterSelectItem = screen.getAllByTestId('filterSelectItem');

    await userEvent.click(filterSelectItem[2]);

    const filterSelectInput = screen.getByTestId('filterSelectInput');

    expect(filterSelectInput).toHaveValue('Data de Entrada');
  });

  it('should call the filter select function to set the books to default order', async () => {
    await renderComponentWithServer();

    const filterSelectField = screen.getByTestId('filterSelectField');

    await userEvent.click(filterSelectField);

    const filterSelectItem = screen.getByTestId('filterSelectItemDefault');

    await userEvent.click(filterSelectItem);

    const filterSelectInput = screen.getByTestId('filterSelectInput');

    expect(filterSelectInput).toHaveValue('');
  });
});
