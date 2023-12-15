/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import NewBook from '.';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { UserBooksContext, UserBooksStorage } from '../../../context/UserContext';
import { Server } from 'miragejs';
import { mockServer } from '../../../../miragejs/server';
import React from 'react';

describe('<NewBook />', () => {
  let server: Server;

  beforeEach(async () => {
    server = mockServer({ environment: 'test' });

    server.createList('book', 3);

    const wrapper = ({ children }: { children: React.ReactNode }) => <UserBooksStorage>{children}</UserBooksStorage>;

    const useBooks = () => React.useContext(UserBooksContext);

    const { result } = renderHook(() => useBooks(), { wrapper });

    await waitFor(() => {
      const books: any = result.current.books;
      render(
        <BrowserRouter>
          <UserBooksContext.Provider value={{ books: books.books }}>
            <NewBook />
          </UserBooksContext.Provider>
        </BrowserRouter>
      );
    });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should render the component', async () => {
    const pageNewBook = screen.getByTestId('containerNewBook');

    expect(pageNewBook).toBeInTheDocument();
  });

  describe('Form', () => {
    it.skip('should call the submit function when the form is submited', async () => {
      const formNewBook = screen.getByTestId('saveBook');
      const titleField = screen.getByTestId('titleField');
      const synopsisField = screen.getByTestId('synopsisField');
      const autorField = screen.getByTestId('autorField');
      const select = screen.getByTestId('genderField');
      const entryDateField = screen.getByTestId('entryDateField');
      const coverInput: HTMLInputElement = screen.getByTestId('coverInput');
      const file = new File(['hello'], 'hello.png', { type: 'image/png' });

      await userEvent.type(titleField, 'A revolução dos bichos');
      await userEvent.type(synopsisField, 'A revolução dos bichos');
      await userEvent.type(autorField, 'Napoleon Hill');
      await userEvent.click(select);
      const options = screen.getAllByTestId('genderSelected');
      await userEvent.click(options[0]);
      await userEvent.type(entryDateField, '2023-03-23');
      await userEvent.upload(coverInput, file);

      await userEvent.click(formNewBook);

      expect(location.pathname).toBe('/home');
    });
  });

  describe('Title field', () => {
    it('should change value when the user types on the field', async () => {
      const titleField = screen.getByTestId('titleField');

      await userEvent.type(titleField, 'A revolução dos bichos');

      expect(titleField).toHaveValue('A revolução dos bichos');
    });

    it('should throw an error when the field is empty', async () => {
      const titleField = screen.getByTestId('titleField');
      const saveButton = screen.getByTestId('saveBook');

      await userEvent.clear(titleField);
      await userEvent.click(saveButton);

      const errorTitle = screen.getByTestId('titleError');

      expect(errorTitle).toBeInTheDocument();
    });
  });

  describe('Synopsis field', () => {
    it('should change value when the user types on the field', async () => {
      const synopsisField = screen.getByTestId('synopsisField');

      await userEvent.type(synopsisField, 'A revolução dos bichos');

      expect(synopsisField).toHaveValue('A revolução dos bichos');
    });

    it('should throw an error when the field is empty', async () => {
      const synopsisField = screen.getByTestId('synopsisField');
      const saveButton = screen.getByTestId('saveBook');

      await userEvent.clear(synopsisField);
      await userEvent.click(saveButton);

      const errorSynopsis = screen.getByTestId('synopsisError');

      expect(errorSynopsis).toBeInTheDocument();
    });
  });

  describe('Autor field', () => {
    it('should change value when the user types on the field', async () => {
      const autorField = screen.getByTestId('autorField');

      await userEvent.type(autorField, 'Napoleon Hill');

      expect(autorField).toHaveValue('Napoleon Hill');
    });

    it('should throw an error when the field is empty', async () => {
      const autorField = screen.getByTestId('autorField');
      const saveButton = screen.getByTestId('saveBook');

      await userEvent.clear(autorField);
      await userEvent.click(saveButton);

      const errorAutor = screen.getByTestId('autorError');

      expect(errorAutor).toBeInTheDocument();
    });
  });

  describe('Genre field', () => {
    it('should clean the value of the select when clicked on default', async () => {
      const genderDefault = screen.getByTestId('genderDefault');

      await userEvent.click(genderDefault);

      expect(genderDefault).toHaveTextContent('Selecione');
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

    it('should throw an error when the field is empty', async () => {
      const coverInput = screen.getByTestId('coverInput');
      const saveButton = screen.getByTestId('saveBook');

      await userEvent.click(coverInput);
      await userEvent.click(saveButton);
      await userEvent.tab();

      const coverError = screen.getByTestId('coverError');

      expect(coverError).toBeInTheDocument();
    });
  });
});
