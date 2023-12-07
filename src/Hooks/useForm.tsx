import React from 'react';

const validation = {
  group: {
    regex: /^T\d+$/,
    message: 'A turma deve conter somente a letra T e após somente numeros',
  },
};

const useForm = (typeValidate?: string) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  function validate(value: string) {
    if (typeValidate === '') return true;
    if (value.length === 0) {
      setError('Preencha um valor!');
      return false;
    } else if (typeValidate && !validation[typeValidate as keyof typeof validation].regex.test(value)) {
      setError(validation.group.message);
      return false;
    } else {
      setError('');
      return true;
    }
  }

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>): void;
  function onChange({ target }: React.ChangeEvent<HTMLTextAreaElement>): void;
  function onChange({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    validate(target.value);
    setValue(target.value);
  }

  function onSelect(e: React.PointerEvent<HTMLElement>) {
    if (e.currentTarget.textContent) {
      if (error) validate(e.currentTarget.textContent);
      setValue(e.currentTarget.textContent);
    }
  }

  return {
    value,
    setValue,
    onChange,
    error,
    setError,
    onSelect,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
