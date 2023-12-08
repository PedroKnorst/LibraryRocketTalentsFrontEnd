import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import Select from '.';
import useForm from '../../../hooks/useForm';
import userEvent from '@testing-library/user-event';

describe('<Select />', () => {
  it('should render the component', () => {
    const { result } = renderHook(() => useForm());

    const { error, onSelect, value, setValue } = result.current;

    render(
      <Select
        dataTestId="genderField"
        errorTestId="genderError"
        selectedItemTestId="genderSelected"
        mediaquerie="true"
        defaultItem={() => setValue('')}
        selectItem={e => onSelect(e)}
        list={['Autoajuda', 'Romance', 'Suspense', 'Ficção científica']}
        value={value}
        label={'Gênero'}
        error={error}
      />
    );

    const select = screen.getByTestId('genderField');

    expect(select).toBeInTheDocument();
  });

  it('should change the value when an option is selected', async () => {
    const { result } = renderHook(() => useForm());

    const { error, onSelect, value, setValue } = result.current;

    render(
      <Select
        dataTestId="genderField"
        errorTestId="genderError"
        selectedItemTestId="genderSelected"
        mediaquerie="true"
        defaultItem={() => setValue('')}
        selectItem={e => onSelect(e)}
        list={['Autoajuda', 'Romance', 'Suspense', 'Ficção científica']}
        value={value}
        label={'Gênero'}
        error={error}
      />
    );

    const select = screen.getByTestId('genderField');

    await userEvent.click(select);

    const options = screen.getAllByTestId('genderSelected');

    await userEvent.click(options[0]);

    const { value: currentValue } = result.current;

    expect(currentValue).toBe('Autoajuda');
  });

  it('should change throw an error when none of the options was selected', async () => {
    const { result } = renderHook(() => useForm());

    const { error, onSelect, value, setValue, onBlur, validate } = result.current;

    render(
      <Select
        onBlur={onBlur}
        defaultItemTestId="genderDefault"
        dataTestId="genderField"
        errorTestId="genderError"
        selectedItemTestId="genderSelected"
        mediaquerie="true"
        defaultItem={() => {
          setValue('');
          validate();
        }}
        selectItem={e => onSelect(e)}
        list={['Autoajuda', 'Romance', 'Suspense', 'Ficção científica']}
        value={value}
        label={'Gênero'}
        error={error}
      />
    );

    const select = screen.getByTestId('genderField');

    await userEvent.click(select);

    const options = screen.getAllByTestId('genderSelected');

    await userEvent.click(options[0]);

    const { value: updatedValue } = result.current;

    expect(updatedValue).toBe('Autoajuda');

    await userEvent.click(select);

    const defaultItem = screen.getByTestId('genderDefault');

    await userEvent.click(defaultItem);

    const { value: defaultValue, error: defaultError } = result.current;

    expect(defaultValue).toBe('');
    expect(defaultError).toBe('Preencha um valor!');
  });
});
