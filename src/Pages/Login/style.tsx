import { styled } from 'styled-components';

export const ContainerLogin = styled.form`
  width: 25%;
  background-color: white;
  border-radius: 8px;
  display: grid;
  padding: 3.5rem 2.5rem;
  gap: 1rem;

  @media (max-width: 1024px) {
    width: 35%;
  }

  @media (max-width: 650px) {
    width: 50%;
  }

  @media (max-width: 450px) {
    width: 70%;
  }
`;

export const InputLogin = styled.input`
  background-color: #f1f3f5;
  border-radius: 4px;
  padding: 1rem;
  border: none;

  &::placeholder {
    color: #868e96;
  }
`;

export const ContainerInputLogin = styled.div`
  position: relative;
  display: grid;
`;

export const IconeInput = styled.label`
  position: absolute;
  right: 16px;
  top: 15px;
`;

export const ContainerLogo = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;
`;

export const ButtonLogin = styled.button`
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: black;
  margin-top: 1rem;
  border: none;
  background-color: #ffc501;
  border-radius: 4px;
  padding: 0.75rem;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ffd857;
  }
`;

export const LostPassword = styled.a`
  color: black;
  font-weight: 700;
  font-size: 0.875rem;
`;

interface Props {
  active: string;
}

export const Bacground1 = styled.section<Props>`
  background: ${({ active }) => `url(${active})`} no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  position: relative;
`;

export const Bacground2 = styled.div<Props>`
  height: 100vh;
  background: ${({ active }) => `url(${active})`};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
