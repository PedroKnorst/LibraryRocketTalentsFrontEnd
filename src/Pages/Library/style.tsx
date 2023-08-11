import { styled } from "styled-components";

export const ContainerLibrary = styled.div`
  display: grid;
  grid-template-rows: auto auto;
`;

export const SectinoInputsLibrary = styled.section`
  padding: 3rem 0;
`;

export const ContainerInputsLibrary = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  max-width: 1300px;
  margin: auto;
  padding: 0 11.25rem;

  @media (max-width: 1200px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 8rem;
  }

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media (max-width: 650px) {
    padding: 0 5rem;
  }

  @media (max-width: 525px) {
    padding: 0 3rem;
  }

  @media (max-width: 450px) {
    padding: 0 1rem;
  }
`;

export const ContainerSearchLibrary = styled.form`
  display: grid;
  grid-template-columns: auto 3fr auto;
  justify-content: center;
  border: solid #adb5bd 1px;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 5px;
  gap: 1rem;
  align-items: center;

  & label {
    justify-self: end;
  }

  @media (max-width: 650px) {
    grid-template-columns: auto 2fr auto;
  }

  @media (max-width: 450px) {
    grid-template-columns: auto 1fr auto;
    padding: 0.5rem;
  }
`;

export const InputSearch = styled.input`
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-style: italic;
    font-size: 1rem;
    color: #adb5bd;
  }
`;

export const ButtonInputSearch = styled.button`
  cursor: pointer;
  background-color: #ffc501;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
`;

export const ContainerBooksLibrary = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  gap: 2.5rem;
  margin: 5rem;

  @media (max-width: 1350px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    margin: 3rem;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 650px) {
    margin: 3rem 1rem;
    grid-template-columns: 1fr;
  }

  @media (max-width: 450px) {
    margin: 3rem 0.5rem;
    grid-template-columns: 1fr;
  }
`;
