import React from "react";
import { ContainerInput, InputError, LabelInput, TextArea } from "./style";

interface Props {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  gridArea?: object;
  id: string;
  label: string;
  error: string;
  style?: object;
}

const InputTextArea = ({
  onChange,
  value,
  gridArea,
  id,
  label,
  error,
  style,
}: Props) => {
  return (
    <ContainerInput style={gridArea}>
      <TextArea style={style} onChange={onChange} value={value} id={id} />
      <LabelInput htmlFor={id}>{label}</LabelInput>
      {error && <InputError>{error}</InputError>}
    </ContainerInput>
  );
};

export default InputTextArea;
