import { styled } from "styled-components";

export const ContainerDataInactive = styled.div`
  grid-column: 1 / 3;

  & h2 {
    justify-self: start;
    color: #3e4756;
    font-weight: 500;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
`;

export const ContainerInactiveContent = styled.div`
  background-color: #f4f4f4;
  border-radius: 5px;
  padding: 1rem;

  & h3 {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #3e4756;
  }

  & p {
    color: #3e4756;
    font-size: 1rem;
    font-weight: 300;
  }
`;
