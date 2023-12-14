import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '.';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<Header />', () => {
  beforeEach(() => {
    render(<Header />, { wrapper: BrowserRouter });
  });

  it('should render the component', () => {
    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
  });

  it('should open modal of logout when button is clicked', async () => {
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
    const buttonOpenModal = screen.getByTestId('openModal');
    const logout = screen.getByTestId('logout');

    await userEvent.click(buttonOpenModal);

    await userEvent.click(logout);

    expect(location.pathname).toBe('/');
  });
});
