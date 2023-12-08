import { act, renderHook } from '@testing-library/react';
import useForm from './useForm';

describe('useForm', () => {
  it('should return the value as empty on initial state', () => {
    const { result } = renderHook(() => useForm());

    const value = result.current.value;

    expect(value).toBe('');
  });

  it('should change the value when setValue is called', async () => {
    const { result } = renderHook(() => useForm());

    const { setValue } = result.current;

    act(() => setValue('Titulo'));

    const { value } = result.current;

    expect(value).toBe('Titulo');
  });

  it('should throw an error if the value is empty', async () => {
    const { result } = renderHook(() => useForm());

    const { setValue } = result.current;

    act(() => setValue(''));

    const { validate } = result.current;

    act(() => validate());

    const { error } = result.current;

    expect(error).toBe('Preencha um valor!');
  });

  it('should throw a regex error if the type of validation is group and the value is wrong', async () => {
    const { result } = renderHook(() => useForm('group'));

    const { setValue } = result.current;

    act(() => setValue('23t'));

    const { validate } = result.current;

    act(() => validate());

    const { error } = result.current;

    expect(error).toBe('A turma deve conter somente a letra T e após somente numeros');
  });

  it('should not throw an error if it has a value', async () => {
    const { result } = renderHook(() => useForm());

    const { setValue } = result.current;

    act(() => setValue('Titulo'));

    const { validate } = result.current;

    act(() => validate());

    const { error } = result.current;

    expect(error).toBe('');
  });
});
