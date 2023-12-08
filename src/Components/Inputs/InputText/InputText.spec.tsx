import '@testing-library/jest-dom';
import { renderHook, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import useForm from '../../../hooks/useForm';
import InputText from '.';
import userEvent from '@testing-library/user-event';

describe('<InputText />', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useForm());

    const title = result.current;

    render(
      <InputText
        error={title.error}
        id="inputTitle"
        label="Titulo"
        onChange={title.onChange}
        onBlur={title.onBlur}
        type="text"
        value={title.value}
        inputTestId="inputTitle"
      />
    );
  });

  it('should render the component', () => {
    const input = screen.getByTestId('inputTitle');

    expect(input).toBeInTheDocument();
  });

  it('should change the value of the input when typed', async () => {
    const input = screen.getByTestId('inputTitle');

    await userEvent.type(input, 'A revolução dos bichos');

    expect(input).toHaveValue('A revolução dos bichos');
  });
});
