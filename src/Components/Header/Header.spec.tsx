import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '.';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<Header />', () => {
  it('should render the component', () => {
    render(<Header />, { wrapper: BrowserRouter });

    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
  });

  it('should open modal of logout when button is clicked', async () => {
    render(<Header />, { wrapper: BrowserRouter });

    const buttonOpenModal = screen.getByTestId('openModal');
    const arrowLogout = screen.getByTestId('arrowLogout');
    const logout = screen.getByTestId('logout');

    await userEvent.click(buttonOpenModal);

    expect(arrowLogout).toHaveAttribute('active', 'true');
    expect(logout).toHaveAttribute('active', 'true');

    await userEvent.click(buttonOpenModal);

    expect(arrowLogout).toHaveAttribute('active', 'false');
    expect(logout).toHaveAttribute('active', 'false');
  });

  it('should go back to login page when button logout is clicked', async () => {
    render(<Header />, { wrapper: BrowserRouter });

    jest.spyOn(window, 'confirm').mockImplementation(() => true);

    const buttonOpenModal = screen.getByTestId('openModal');
    const logout = screen.getByTestId('logout');

    await userEvent.click(buttonOpenModal);

    await userEvent.click(logout);

    expect(location.pathname).toBe('/');
  });

  it('should load user if it is already log', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');

    localStorage.setItem('User', JSON.stringify({ name: 'Pedro', email: 'pedro@gmail.com' }));

    render(<Header />, { wrapper: BrowserRouter });

    const buttonOpenModal = screen.getByTestId('openModal');

    await userEvent.click(buttonOpenModal);

    const userName = screen.getByTestId('userName');

    expect(userName).toHaveTextContent('Pedro');
  });
});
