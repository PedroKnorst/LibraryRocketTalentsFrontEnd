import '@testing-library/jest-dom';
import { renderHook, screen, waitFor } from '@testing-library/react';
import { render } from '@testing-library/react';
import useForm from '../../../hooks/useForm';
import InputText from '.';

describe('<InputText />', () => {
  beforeEach(async () => {
    const { result } = renderHook(() => useForm());

    const title = result.current;

    await waitFor(() => {
      render(
        <InputText
          onBlur={title.onBlur}
          inputTestId="inputTitle"
          id="inputTitle"
          label="Titulo"
          onChange={title.onChange}
          value={title.value}
          type="text"
          error={title.error}
        />
      );
    });
  });

  it('should render the component', () => {
    const input = screen.getByTestId('inputTitle');

    expect(input).toBeInTheDocument();
  });
});
