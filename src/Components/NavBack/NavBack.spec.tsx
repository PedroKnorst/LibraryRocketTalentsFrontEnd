import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NavBack from '.';
import userEvent from '@testing-library/user-event';

describe('<NavBack />', () => {
  it('should render the component', () => {
    render(<NavBack page="Biblioteca" path="home" />, { wrapper: BrowserRouter });

    const navBack = screen.getByTestId('navBackContainer');

    expect(navBack).toBeInTheDocument();
  });

  it('should go back to home page when the button is clicked', async () => {
    render(<NavBack page="Biblioteca" path="/home" />, { wrapper: BrowserRouter });

    const buttonNavBack = screen.getByTestId('buttonNavBack');

    await userEvent.click(buttonNavBack);

    expect(location.pathname).toBe('/home');
  });

  it('should display the name of the current page when the attribute page is set', async () => {
    render(<NavBack page="Biblioteca" path="/home" />, { wrapper: BrowserRouter });

    const navBack = screen.getByTestId('navBackContainer');

    expect(navBack).toHaveTextContent('Biblioteca');
  });
});
