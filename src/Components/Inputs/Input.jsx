import { styled } from "styled-components";

export const ContainerInput = styled.div`
  position: relative;
  display: grid;
`;

const InputStyle = `
  width: 350px;
  border: solid 1px #133052;
  border-radius: 5px;
  padding: 1rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;

  &:focus + label {
    transform: translateY(-25px);
    font-size: 0.8rem;
  }
`;

export const Input = styled.input`
  ${InputStyle}
`;

export const InputError = styled.p`
  color: #f31;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const LabelInput = styled.label`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #133052;
  pointer-events: none;
  transition: 0.4s;
  background-color: white;
  padding: 0 6px;
`;

export const TextArea = styled.textarea`
  ${InputStyle}
  resize: none;
`;

export const InputFile = styled.label`
  cursor: pointer;
  width: 10rem;
  display: flex;
  align-items: center;
  border: #ffc501 dashed 2px;
  color: #ffc501;
  font-weight: 500;
  font-size: 1.25rem;
  justify-content: center;

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
  }
`;
