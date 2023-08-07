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
`;

export const ContainerSearchLibrary = styled.div`
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
  gap: 2.5rem;
  margin: 5rem;
`;
