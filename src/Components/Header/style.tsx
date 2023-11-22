import { styled } from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.125rem;
`;

export const DivUser = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
`;

interface Props {
  active: string;
}

export const Logout = styled.button<Props>`
  display: ${({ active }) => (active === 'true' ? 'block' : 'none')};
  position: absolute;
  cursor: pointer;
  background-color: #f4f4f4;
  padding: 1rem;
  font-size: 18px;
  border-radius: 5px;
  border-style: none;
  transition: all 0.2s ease-in-out;
  top: 3rem;
  right: 0;
  left: 0;

  &:hover {
    background-color: #dbdbdb;
  }
`;

export const ArrowElement = styled.img<Props>`
  ${({ active }) => (active === 'true' ? 'transform: rotateZ(-180deg);' : '')}
  transition: all 0.2s ease-in-out;
`;
