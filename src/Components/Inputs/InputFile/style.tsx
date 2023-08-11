import { styled } from "styled-components";

export const ContainerImg = styled.label`
  cursor: pointer;
  grid-area: capa;
  width: 10rem;
  display: flex;
  align-items: center;
  border: #ffc501 dashed 2px;
  color: #ffc501;
  font-weight: 500;
  font-size: 1.25rem;
  justify-content: center;
  justify-self: center;

  & img {
    max-width: 100%;
    height: 200px;
  }

  & input {
    display: none;
  }

  & span {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    max-width: 100%;
    height: 200px;
  }
`;
