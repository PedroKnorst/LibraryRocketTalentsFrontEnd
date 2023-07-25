import { styled } from "styled-components";

export const ContainerNewBook = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
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
