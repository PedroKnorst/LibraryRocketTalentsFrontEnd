import React from 'react';

type Validation = {
  group: {
    regex: RegExp;
    message: string;
  };
};

const validation: Validation = {
  group: {
    regex: /^T\d+$/,
    message: 'A turma deve conter somente a letra T e após somente numeros',
  },
};

const useForm = (typeValidate?: 'group') => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  function validate(value: string) {
    if (value === '') {
      setError('Preencha um valor!');
      return false;
    } else if (typeValidate && !validation[typeValidate].regex.test(value)) {
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
    if (e.currentTarget.textContent !== null) {
      setValue(e.currentTarget.textContent);
      validate(e.currentTarget.textContent);
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
