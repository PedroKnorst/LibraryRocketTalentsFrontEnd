import { render, renderHook, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Server } from 'miragejs';
import { mockServer } from '../../../../miragejs/server';
import BookDataBorrow from '.';
import userEvent from '@testing-library/user-event';
import { UserBooksContext, UserBooksStorage } from '../../../context/UserContext';
import React from 'react';
import { Book } from '../../../interfaces/book';

describe('<BookDataBorrow />', () => {
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
      <MemoryRouter initialEntries={[`/home/biblioteca/emprestar/${book.id}`]}>
        <Routes>
          <Route path="/home/biblioteca/emprestar/:id" element={<BookDataBorrow />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(async () => {
    await renderComponentWithServer();
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should render the component', async () => {
    const borrowBookModal = screen.getByTestId('borrowBookModal');

    expect(borrowBookModal).toBeInTheDocument();
  });

  it('should update book infos when submit button is clicked', async () => {
    let book = await getBooksRequest();

    expect(book.isBorrowed).toBe(false);

    const nameInput = screen.getByTestId('nameInput');
    const classInput = screen.getByTestId('classInput');
    const withdrawalDateInput = screen.getByTestId('withdrawalDateInput');
    const deliveryDateInput = screen.getByTestId('deliveryDateInput');
    const submitButton = screen.getByTestId('submitButton');

    await userEvent.type(nameInput, 'Aluno');
    await userEvent.type(classInput, 'T32');
    await userEvent.type(withdrawalDateInput, '2023-03-23');
    await userEvent.type(deliveryDateInput, '2023-03-28');

    const errorName = screen.queryByTestId('errorName');
    const errorClass = screen.queryByTestId('errorClass');
    const errorWithdrawalDate = screen.queryByTestId('errorWithdrawalDate');
    const errorDeliveryDate = screen.queryByTestId('errorDeliveryDate');

    expect(errorName).toBeNull();
    expect(errorClass).toBeNull();
    expect(errorWithdrawalDate).toBeNull();
    expect(errorDeliveryDate).toBeNull();

    await userEvent.click(submitButton);

    book = await getBooksRequest();

    expect(book.rentHistory[2].studentName).toBe('Aluno');
    expect(book.isBorrowed).toBe(true);
  });

  it('should throw an error when date1 is higher than date2', async () => {
    const withdrawalDateInput = screen.getByTestId('withdrawalDateInput');
    const deliveryDateInput = screen.getByTestId('deliveryDateInput');
    const submitButton = screen.getByTestId('submitButton');

    await userEvent.type(withdrawalDateInput, '2023-03-28');
    await userEvent.type(deliveryDateInput, '2023-03-23');

    await userEvent.click(submitButton);

    const errorWithdrawalDate = screen.getByTestId('errorWithdrawalDate');

    expect(errorWithdrawalDate).toBeInTheDocument();
    expect(errorWithdrawalDate).toHaveTextContent('A data de retirada deve ser antes da data de entrega!');
  });
});
