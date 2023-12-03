import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NewBook from '.';
import { BrowserRouter } from 'react-router-dom';

describe('<NewBook />', () => {
  beforeEach(() => {
    render(<NewBook />, { wrapper: BrowserRouter });
  });

  it('should render the component', () => {
    const pageNewBook = screen.getByTestId('containerNewBook');

    expect(pageNewBook).toBeInTheDocument();
  });

  describe('<ContainerInputs />', () => {
    it('should render the field of title', () => {
      const titleField = screen.getByTestId('titleField');

      expect(titleField).toBeInTheDocument();
    });
    
    it('should render the field of title', () => {
      const titleField = screen.getByTestId('titleField');

      expect(titleField).toBeInTheDocument();
    });
  });
});
