import { ContainerInputText, Input, InputError, LabelInputText } from './style';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  id: string;
  label: string;
  gridArea?: object;
  type: string;
  error: string;
}

const InputText = ({ onChange, value, id, label, gridArea, type, error }: Props) => {
  return (
    <ContainerInputText style={gridArea}>
      <Input onChange={onChange} value={value} type={type} id={id} />
      <LabelInputText htmlFor={id}>{label}</LabelInputText>
      {error && <InputError>{error}</InputError>}
    </ContainerInputText>
  );
};

export default InputText;
