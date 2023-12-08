import React from 'react';
import { ArrowSelect, ContainerSelect, InputError, OptionsSelect, SelectArea } from './style';
import IconSelect from '../../../assets/svg/IconSelect.svg';

interface SelectProps {
  onBlur?: () => void;
  label: string;
  style?: object;
  labelStyle?: string;
  selectStyle?: object;
  value: string;
  selectItem: React.PointerEventHandler<HTMLElement>;
  list: string[];
  defaultItem: React.PointerEventHandler<HTMLElement>;
  mediaquerie: string;
  dataTestId?: string;
  error?: string;
  errorTestId?: string;
  selectedItemTestId?: string;
  inputTestId?: string;
  defaultItemTestId?: string;
}

const Select = ({
  label,
  style,
  labelStyle,
  selectStyle,
  value,
  selectItem,
  list,
  defaultItem,
  mediaquerie,
  dataTestId,
  inputTestId,
  error,
  errorTestId,
  selectedItemTestId,
  onBlur,
  defaultItemTestId,
}: SelectProps) => {
  const [active, setActive] = React.useState(false);

  return (
    <ContainerSelect
      onBlur={onBlur}
      data-testid={dataTestId}
      onClick={() => setActive(prevActive => !prevActive)}
      style={style}
      mediaquerie={`${mediaquerie}`}
    >
      <SelectArea
        data-testid={inputTestId}
        labelstyle={labelStyle}
        active={`${active}`}
        value={value}
        style={selectStyle}
        readOnly
      ></SelectArea>
      <label>{label}</label>
      <ArrowSelect src={IconSelect} active={`${active}`} />
      <OptionsSelect active={`${active}`}>
        <li data-testid={defaultItemTestId} onPointerDown={defaultItem}>
          Selecione
        </li>
        {list.map(item => (
          <li data-testid={selectedItemTestId} onPointerDown={selectItem} key={item}>
            {item}
          </li>
        ))}
      </OptionsSelect>
      {error && <InputError data-testid={errorTestId}>{error}</InputError>}
    </ContainerSelect>
  );
};

export default Select;
