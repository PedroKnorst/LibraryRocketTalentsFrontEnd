import { ContainerInputText, Input, InputError, LabelInputText } from './style';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  id: string;
  label: string;
  gridArea?: object;
  type: string;
  error: string;
  inputTestId?: string;
  errorTestId?: string;
}

const InputText = ({
  onChange,
  value,
  id,
  label,
  gridArea,
  type,
  error,
  inputTestId,
  errorTestId,
  ...props
}: Props) => {
  return (
    <ContainerInputText style={gridArea}>
      <Input {...props} data-testid={inputTestId} onChange={onChange} value={value} type={type} id={id} />
      <LabelInputText htmlFor={id}>{label}</LabelInputText>
      {error && <InputError data-testid={errorTestId}>{error}</InputError>}
    </ContainerInputText>
  );
};

export default InputText;
