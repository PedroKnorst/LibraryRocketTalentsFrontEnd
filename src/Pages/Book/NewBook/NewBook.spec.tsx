import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NewBook from '.';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<NewBook />', () => {
  beforeEach(() => {
    render(<NewBook />, { wrapper: BrowserRouter });
  });

  it('should render the component', () => {
    const pageNewBook = screen.getByTestId('containerNewBook');

    expect(pageNewBook).toBeInTheDocument();
  });

  describe('Title field', () => {
    it('should render the field of title', () => {
      const titleField = screen.getByTestId('titleField');

      expect(titleField).toBeInTheDocument();
    });

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
    it('should render the field of synopsis', () => {
      const synopsisField = screen.getByTestId('synopsisField');

      expect(synopsisField).toBeInTheDocument();
    });

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
    it('should render the field of autor', () => {
      const autorField = screen.getByTestId('autorField');

      expect(autorField).toBeInTheDocument();
    });

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

  describe('Gender field', () => {
    it('should render the field of entry date', () => {
      const genderField = screen.getByTestId('genderField');

      expect(genderField).toBeInTheDocument();
    });

    // it('should change value when the user types on the field', async () => {
    //   const genderField = screen.getByTestId('genderField');

    //   await userEvent.click(genderField);

    //   const genderSelected = screen.getAllByTestId('genderSelected');

    //   // await userEvent.click(genderSelected[0]);

    //   expect(genderSelected[0]).toBeInTheDocument();
    // });

    // it('should throw an error when the field is empty', async () => {
    //   const genderField = screen.getByTestId('genderField');
    //   const saveButton = screen.getByTestId('saveBook');

    //   await userEvent.clear(genderField);
    //   await userEvent.click(saveButton);
    //   await userEvent.tab();

    //   const errorAutor = screen.getByTestId('entryDateError');

    //   expect(errorAutor).toBeInTheDocument();
    // });
  });

  describe('Entry Date field', () => {
    it('should render the field of entry date', () => {
      const entryDateField = screen.getByTestId('entryDateField');

      expect(entryDateField).toBeInTheDocument();
    });

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
});
