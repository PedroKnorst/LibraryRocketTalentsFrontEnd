import { styled } from "styled-components";
import { ReactComponent as Logo } from "../../Assets/svg/Logo.svg";

export const FormLogin = styled.form`
  width: 25%;
  background-color: white;
  border-radius: 8px;
  display: grid;
  padding: 3.5rem 2.5rem;
  gap: 1rem;
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

export const LogoLogin = styled(Logo)`
  justify-self: center;
  margin-bottom: 2.5rem;
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
