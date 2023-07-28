import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const ContainerNewBook = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  height: 100%;
`;

export const SectionInputs = styled.section`
  max-width: 60rem;
  display: grid;
  margin: auto;
  gap: 2rem;
`;

export const ContainerInputs = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-areas:
    "capa titulo autor"
    "capa sinopse genero"
    "capa sinopse data";
`;

export const ConitainerButtons = styled.div`
  display: flex;
  justify-self: end;
  gap: 1.5rem;
`;

export const ButtonCancel = styled(Link)`
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  width: 150px;
  padding: 1rem;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  border: #133052 1px solid;
  text-transform: uppercase;
  text-align: center;
  background-color: white;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
`;

export const ButtonSave = styled.button`
  font-family: "Roboto", sans-serif;
  width: 150px;
  padding: 1rem;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  background-color: #ffc501;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1rem;
`;
