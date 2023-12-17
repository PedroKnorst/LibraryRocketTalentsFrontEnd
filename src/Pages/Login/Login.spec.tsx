import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '.';
import userEvent from '@testing-library/user-event';
import { Server } from 'miragejs';
import { mockServer } from '../../../miragejs/server';

describe('<Login />', () => {
  window.alert = jest.fn();
  let server: Server;

  beforeEach(() => {
    server = mockServer({ environment: 'test' });

    server.createList('user', 1);

    render(<Login />, { wrapper: BrowserRouter });
  });

  afterEach(() => {
    server.shutdown();
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

  it('should throw an error if the password or email is incorrect', async () => {
    const loginButton = screen.getByTestId('loginButton');

    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');

    await userEvent.type(emailInput, 'gx2tecnologia@gx2.com');

    await userEvent.type(passwordInput, 'gx2');

    await userEvent.click(loginButton);

    const loginPage = screen.getByTestId('containerLogin');

    expect(loginPage).toBeInTheDocument();
  });
});
