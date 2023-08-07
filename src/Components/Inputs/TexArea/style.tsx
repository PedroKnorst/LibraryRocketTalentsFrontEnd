import { styled } from "styled-components";

export const ContainerInput = styled.div`
  position: relative;
  display: grid;

  & p {
    position: absolute;
    bottom: -1.5rem;
    left: 0;
  }
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
  width: 350px;
  border: solid 1px #133052;
  border-radius: 5px;
  padding: 1rem;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  resize: none;

  ${({ value }) =>
    value
      ? `& + label {
          transform: translateY(-25px);
          font-size: 0.8rem;
         }`
      : `&:focus + label {
          transform: translateY(-25px);
          font-size: 0.8rem;
         }`}
`;
