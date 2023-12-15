import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '.';
import { BrowserRouter } from 'react-router-dom';

describe('<Home />', () => {
  it('should render the component', () => {
    render(<Home />, { wrapper: BrowserRouter });

    const homeElement = screen.getByTestId('homePage');

    expect(homeElement).toBeInTheDocument();
  });
});
