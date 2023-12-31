import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const ContainerBookStyle = styled(Link)`
  text-decoration: none;
  display: grid;
  width: 10rem;
  cursor: pointer;
  justify-items: center;
  padding: 1.5rem 2rem;
  background-color: #f4f4f4;
  border-radius: 5px;
  gap: 1rem;
  transition: all 0.2s linear;

  & h2 {
    font-size: 1rem;
    color: #3e4756;
    font-weight: 500;
    text-align: center;
  }

  & img {
    max-width: 100px;
    height: 150px;
  }

  &:hover {
    background-color: #dcdada;
  }

  @media (max-width: 1500px) {
    width: 8rem;
  }
`;
