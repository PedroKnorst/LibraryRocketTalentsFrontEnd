import React from 'react';
import { ArrowSelect, ContainerSelect, OptionsSelect, SelectArea } from './style';
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
}: SelectProps) => {
  const [active, setActive] = React.useState(false);

  return (
    <ContainerSelect
      data-testid={dataTestId}
      onPointerDown={() => setActive(prevActive => !prevActive)}
      style={style}
      mediaquerie={`${mediaquerie}`}
    >
      <SelectArea labelstyle={labelStyle} active={`${active}`} value={value} style={selectStyle} readOnly></SelectArea>
      <label>{label}</label>
      <ArrowSelect src={IconSelect} active={`${active}`} />
      <OptionsSelect active={`${active}`}>
        <li onPointerDown={defaultItem}>Selecione</li>
        {list.map(item => (
          <li onPointerDown={selectItem} key={item}>
            {item}
          </li>
        ))}
      </OptionsSelect>
    </ContainerSelect>
  );
};

export default Select;
