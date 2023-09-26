import styled from 'styled-components';

interface Props {
  status: 'success' | 'failure';
}

export const ContainerModal = styled.div<Props>`
  background-color: ${({ status }) => (status === 'success' ? 'green' : 'red')};
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
`;
