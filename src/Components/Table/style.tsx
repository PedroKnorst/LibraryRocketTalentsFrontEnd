import { styled } from "styled-components";

export const ContainerTable = styled.div`
  display: grid;
`;

export const TableLoans = styled.table`
  margin: 2.5rem 1.5rem;
  border-collapse: collapse;

  & th,
  & td {
    text-align: left;
    padding: 1rem 2.5rem;

    @media (max-width: 1024px) {
      padding: 1rem 0.5rem;
    }
  }
`;

export const TheadLoans = styled.thead`
  background-color: #ffc501;

  & th:first-child {
    border-top-left-radius: 5px;
  }

  & th:last-child {
    border-top-right-radius: 5px;
  }
`;

export const TbodyLoans = styled.tbody`
  & tr {
    border-bottom: #cdcdcd solid 1px;
  }
`;

export const FilterButton = styled.div`
  cursor: pointer;
  border-bottom: black solid 1px;
  padding: 0.5rem 4rem 0.5rem 0;

  @media (max-width: 1024px) {
    padding: 0.5rem 2rem 0.5rem 0;
  }
`;
