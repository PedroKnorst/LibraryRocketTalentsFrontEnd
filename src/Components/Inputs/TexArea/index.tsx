import React from 'react';
import { ContainerInput, InputError, LabelInput, TextArea } from './style';

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  gridArea?: object;
  id: string;
  label: string;
  error: string;
  style?: object;
  inputTestId?: string;
  errorTestId?: string;
}

const InputTextArea = ({
  onChange,
  value,
  gridArea,
  id,
  label,
  error,
  style,
  inputTestId,
  errorTestId,
  ...props
}: Props) => {
  return (
    <ContainerInput style={gridArea}>
      <TextArea {...props} style={style} data-testid={inputTestId} onChange={onChange} value={value} id={id} />
      <LabelInput htmlFor={id}>{label}</LabelInput>
      {error && <InputError data-testid={errorTestId}>{error}</InputError>}
    </ContainerInput>
  );
};

export default InputTextArea;
