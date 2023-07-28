import React from "react";
import { styled } from "styled-components";
import { ReactComponent as IconSelect } from "../../Assets/svg/Polígono 4.svg";

const ContainerSelect = styled.div`
  display: grid;
  position: relative;
`;

const SelectArea = styled.textarea`
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  color: #343a40;
  cursor: pointer;
  border: solid 1px #133052;
  border-radius: 5px;
  resize: none;
  padding: 0.5rem;
  border-radius: 5px;
`;

const LabelSelect = styled.label`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: white;
  padding: 0 5rem 0 0;
  color: ${({ labelstyle }) => labelstyle};
  transition: all 0.4s ease-in-out;

  ${({ active }) =>
    active === "true"
      ? `transform: translate(-0.25rem, -1.5rem);
         padding: 0 4px;
         font-size: 0.8rem;
         color: #343a40;`
      : ""}
`;

const ArrowSelect = styled(IconSelect)`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  transition: all 0.3s ease-in-out;

  ${({ active }) => (active === "true" ? "transform: rotateZ(-180deg);" : "")}
`;

const OptionsSelect = styled.ul`
  display: none;
  position: absolute;
  top: 3.75rem;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 5px 10px #00000033;
  border-radius: 5px;
  color: #3e4756;
  list-style: none;
  z-index: 100;

  ${({ active }) => (active === "true" ? "display: block;" : "")}

  & li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s linear;
  }

  & li:hover {
    background-color: #edf4fb;
  }

  & li:first-child:hover {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  & li:last-child:hover {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const Select = ({ label, style, labelstyle, selectstyle, value }) => {
  const [active, setActive] = React.useState(false);

  return (
    <ContainerSelect
      onClick={() => setActive((prevActive) => !prevActive)}
      style={style}
    >
      <SelectArea value={value} style={selectstyle} readOnly></SelectArea>
      <LabelSelect labelstyle={labelstyle} active={`${active}`}>
        {label}
      </LabelSelect>
      <ArrowSelect active={`${active}`} />
      <OptionsSelect active={`${active}`}>
        <li>Ola</li>
        <li>Ola</li>
        <li>Ola</li>
      </OptionsSelect>
    </ContainerSelect>
  );
};

export default Select;
