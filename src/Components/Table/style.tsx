import { styled } from "styled-components";
import Filter from "../../assets/svg/Filter";

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

export const FilterButton = styled(Filter)`
  cursor: pointer;
  border-bottom: black solid 1px;
  padding: 0.5rem 4rem 0.5rem 0;
`;
