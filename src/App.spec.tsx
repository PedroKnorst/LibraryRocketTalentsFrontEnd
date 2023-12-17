import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('should render the component', () => {
    render(<App />);

    const containerApp = screen.getByTestId('containerApp');

    expect(containerApp).toBeInTheDocument();
  });
});
