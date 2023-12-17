import '@testing-library/jest-dom';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import EditBook from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { UserBooksContext, UserBooksStorage } from '../../../context/UserContext';
import { Server } from 'miragejs';
import { mockServer } from '../../../../miragejs/server';
import React from 'react';
import { Book } from '../../../interfaces/book';

describe('<EditBook />', () => {
  window.alert = jest.fn();
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

    server.createList('book', 1);

    const books = await getBooksRequest();

    render(
      <MemoryRouter initialEntries={[`/home/editar/${books[0].id}`]}>
        <UserBooksContext.Provider value={{ books: books }}>
          <Routes>
            <Route path="/home/editar/:id" element={<EditBook />} />
          </Routes>
        </UserBooksContext.Provider>
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
    const pageEditBook = screen.getByTestId('editBookContainer');

    expect(pageEditBook).toBeInTheDocument();
  });

  describe('Form', () => {
    it('should call the submit function when the form is submited', async () => {
      const formEditBook = screen.getByTestId('saveBook');
      const titleField = screen.getByTestId('titleField');
      const synopsisField = screen.getByTestId('synopsisField');
      const autorField = screen.getByTestId('autorField');
      const entryDateField = screen.getByTestId('entryDateField');

      await userEvent.click(titleField);
      await userEvent.clear(titleField);
      await userEvent.clear(synopsisField);
      await userEvent.clear(autorField);
      await userEvent.clear(entryDateField);
      await userEvent.type(titleField, 'A revolução dos bichos');
      await userEvent.type(synopsisField, 'Descrição do livro A revolução dos bichos');
      await userEvent.type(autorField, 'Napoleon Hill');
      await userEvent.type(entryDateField, '2023-03-23');

      await userEvent.click(formEditBook);

      const books = await getBooksRequest();

      expect(books[0].title).toBe('A revolução dos bichos');
    });
  });

  describe('Title field', () => {
    it('should load field with a value', async () => {
      const books = await getBooksRequest();

      const titleField: HTMLInputElement = screen.getByTestId('titleField');

      expect(titleField.value).toBe(books[0].title);
    });

    it('should change value when the user types on the field', async () => {
      const titleField = screen.getByTestId('titleField');

      await userEvent.click(titleField);
      await userEvent.clear(titleField);
      await userEvent.type(titleField, 'A revolução dos bichos');

      expect(titleField).toHaveValue('A revolução dos bichos');
    });

    it('should throw an error when the field is empty', async () => {
      const titleField = screen.getByTestId('titleField');
      const saveButton = screen.getByTestId('saveBook');

      await userEvent.click(titleField);
      await userEvent.clear(titleField);
      await userEvent.click(saveButton);

      const errorTitle = screen.getByTestId('titleError');

      expect(errorTitle).toBeInTheDocument();
    });
  });

  describe('Synopsis field', () => {
    it('should load field with a value', async () => {
      const books = await getBooksRequest();

      const titleField: HTMLInputElement = screen.getByTestId('synopsisField');

      expect(titleField.value).toBe(books[0].synopsis);
    });

    it('should change value when the user types on the field', async () => {
      const synopsisField = screen.getByTestId('synopsisField');

      await userEvent.click(synopsisField);
      await userEvent.clear(synopsisField);
      await userEvent.type(synopsisField, 'A revolução dos bichos');

      expect(synopsisField).toHaveValue('A revolução dos bichos');
    });

    it('should throw an error when the field is empty', async () => {
      const synopsisField = screen.getByTestId('synopsisField');
      const saveButton = screen.getByTestId('saveBook');

      await userEvent.click(synopsisField);
      await userEvent.clear(synopsisField);
      await userEvent.click(saveButton);

      const errorSynopsis = screen.getByTestId('synopsisError');

      expect(errorSynopsis).toBeInTheDocument();
    });
  });

  describe('Autor field', () => {
    it('should load field with a value', async () => {
      const books = await getBooksRequest();

      const autorField: HTMLInputElement = screen.getByTestId('autorField');

      expect(autorField.value).toBe(books[0].author);
    });

    it('should change value when the user types on the field', async () => {
      const autorField = screen.getByTestId('autorField');

      await userEvent.click(autorField);
      await userEvent.clear(autorField);
      await userEvent.type(autorField, 'Napoleon Hill');

      expect(autorField).toHaveValue('Napoleon Hill');
    });

    it('should throw an error when the field is empty', async () => {
      const autorField = screen.getByTestId('autorField');
      const saveButton = screen.getByTestId('saveBook');

      await userEvent.click(autorField);
      await userEvent.clear(autorField);
      await userEvent.click(saveButton);

      const errorAutor = screen.getByTestId('autorError');

      expect(errorAutor).toBeInTheDocument();
    });
  });

  describe('Genre field', () => {
    it('should load field with a value', async () => {
      const books = await getBooksRequest();

      const genreInput: HTMLTextAreaElement = screen.getByTestId('genreInput');

      expect(genreInput.value).toBe(books[0].genre);
    });

    it('should clean the value of the select when clicked on default', async () => {
      const genreDefault = screen.getByTestId('genreDefault');

      await userEvent.click(genreDefault);

      expect(genreDefault).toHaveTextContent('Selecione');
    });
  });

  describe('Entry Date field', () => {
    it('should change value when the user types on the field', async () => {
      const entryDateField = screen.getByTestId('entryDateField');

      await userEvent.click(entryDateField);
      await userEvent.clear(entryDateField);
      await userEvent.type(entryDateField, '2023-03-23');
      await userEvent.tab();

      expect(entryDateField).toHaveValue('2023-03-23');
    });

    it('should throw an error when the field is empty', async () => {
      const entryDateField = screen.getByTestId('entryDateField');
      const saveButton = screen.getByTestId('saveBook');

      await userEvent.click(entryDateField);
      await userEvent.clear(entryDateField);
      await userEvent.click(saveButton);
      await userEvent.tab();

      const errorAutor = screen.getByTestId('entryDateError');

      expect(errorAutor).toBeInTheDocument();
    });
  });

  describe('Cover field', () => {
    it('should change value when the user types on the field', async () => {
      const coverInput: HTMLInputElement = screen.getByTestId('coverInput');

      const file = new File(['hello'], 'hello.png', { type: 'image/png' });

      await userEvent.upload(coverInput, file);

      expect(coverInput.files?.[0]).toEqual(file);
    });
  });
});
