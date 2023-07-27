import React from "react";
import { styled } from "styled-components";
import { ReactComponent as Filter } from "../assets/svg/Caminho 147.svg";

export const ContainerHistoryLoans = styled.div`
  display: grid;
`;

const TableLoans = styled.table`
  margin: 2.5rem 1.5rem;
  border-collapse: collapse;

  & th,
  & td {
    text-align: left;
    padding: 1rem 2.5rem;
  }
`;

const TheadLoans = styled.thead`
  background-color: #ffc501;

  & th:first-child {
    border-top-left-radius: 5px;
  }

  & th:last-child {
    border-top-right-radius: 5px;
  }
`;

const TbodyLoans = styled.tbody`
  & tr {
    border-bottom: #cdcdcd solid 1px;
  }

  & tr:nth-child(1) td img {
    cursor: pointer;
    border-bottom: black solid 1px;
    padding: 0.5rem 4rem 0.5rem 0;
  }
`;

const HistoryLoans = () => {
  return (
    <TableLoans>
      <TheadLoans>
        <tr>
          <th>Aluno</th>
          <th>Turma</th>
          <th>Livro</th>
          <th>Data da Retirada</th>
          <th>Data da Entrega</th>
        </tr>
      </TheadLoans>
      <TbodyLoans>
        <tr>
          <td>
            <Filter />
          </td>
          <td>
            <Filter />
          </td>
          <td>
            <Filter />
          </td>
          <td>
            <Filter />
          </td>
          <td>
            <Filter />
          </td>
        </tr>
      </TbodyLoans>
    </TableLoans>
  );
};

export default HistoryLoans;
