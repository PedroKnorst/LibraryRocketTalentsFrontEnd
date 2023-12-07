import React from 'react';
import { ArrowSelect, ContainerSelect, InputError, OptionsSelect, SelectArea } from './style';
import IconSelect from '../../../assets/svg/IconSelect.svg';

interface SelectProps {
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
  error,
  errorTestId,
  selectedItemTestId,
}: SelectProps) => {
  const [active, setActive] = React.useState(false);

  return (
    <ContainerSelect
      onPointerDown={() => setActive(prevActive => !prevActive)}
      style={style}
      mediaquerie={`${mediaquerie}`}
    >
      <SelectArea
        data-testid={dataTestId}
        labelstyle={labelStyle}
        active={`${active}`}
        value={value}
        style={selectStyle}
        readOnly
      ></SelectArea>
      <label>{label}</label>
      <ArrowSelect src={IconSelect} active={`${active}`} />
      <OptionsSelect active={`${active}`}>
        <li data-testid={selectedItemTestId} onPointerDown={defaultItem}>
          Selecione
        </li>
        {list.map(item => (
          <li onPointerDown={selectItem} key={item}>
            {item}
          </li>
        ))}
      </OptionsSelect>
      {error && <InputError data-testid={errorTestId}>{error}</InputError>}
    </ContainerSelect>
  );
};

export default Select;
