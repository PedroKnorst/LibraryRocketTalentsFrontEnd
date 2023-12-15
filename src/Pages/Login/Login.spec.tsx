import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '.';
import userEvent from '@testing-library/user-event';

describe('<Login />', () => {
  beforeEach(() => {
    render(<Login />, { wrapper: BrowserRouter });
  });

  it('should render the component', async () => {
    const loginPage = screen.getByTestId('containerLogin');

    expect(loginPage).toBeInTheDocument();
  });

  it('should make login', async () => {
    const loginButton = screen.getByTestId('loginButton');

    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');

    await userEvent.type(emailInput, 'gx2tecnologia@gx2.com.br');

    await userEvent.type(passwordInput, 'gx2@123');

    await userEvent.click(loginButton);

    expect(location.pathname).toBe('/home');
  });
});
