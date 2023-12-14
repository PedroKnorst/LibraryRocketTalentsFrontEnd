import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BookHistory from '.';

describe('<BookHistory />', () => {
  it('should render the component', () => {
    render(<BookHistory dataTestId="historyModal" />, { wrapper: BrowserRouter });

    const historyModal = screen.getByTestId('historyModal');

    expect(historyModal).toBeInTheDocument();
  });
});
