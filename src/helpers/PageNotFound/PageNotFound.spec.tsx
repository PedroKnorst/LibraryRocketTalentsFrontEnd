import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PageNotFound from '.';

describe('<PageNotFound />', () => {
  it('should render the component', () => {
    render(<PageNotFound />);

    const pageNotFound = screen.getByTestId('pageNotFound');

    expect(pageNotFound).toBeInTheDocument();
  });
});
