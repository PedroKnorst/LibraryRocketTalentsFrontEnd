import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const ContainerBook = styled.div`
  position: fixed;
  top: 3rem;
  left: 50%;
  max-width: 90%;
  background-color: white;
  transform: translateX(-50%);
  display: grid;
  grid-template-areas:
    "close close"
    "img text"
    "borrow edit";
  padding: 2.5rem;
  gap: 2rem;
`;

export const ButtonClose = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  justify-self: end;
  grid-area: close;
  background-color: transparent;
  border: none;
`;

export const TextBook = styled.div`
  display: grid;
  gap: 1.5rem;
  color: #3e4756;
  grid-area: text;

  & h2 {
    justify-self: center;
    font-weight: 500;
    font-size: 1.25rem;
  }

  & div {
    display: grid;
    gap: 0.5rem;
  }

  & div h3 {
    font-weight: 500;
    font-size: 1rem;
  }

  & div p {
    font-weight: 300;
  }
`;

export const CoverBook = styled.img`
  grid-area: img;
  max-width: 300px;
  height: 450px;
`;

export const ContainerBookButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  grid-area: edit;
`;

const ButtonsStyle = `
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  padding: 1rem 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  background-color: white;
  border-radius: 5px;
  font-family: "Roboto", sans-serif;`;

export const EditButton = styled(Link)`
  ${ButtonsStyle}
  border: #167ce2 solid 1px;
  color: #167ce2;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #d8e6f3;
  }
`;

export const InactiveButton = styled.button`
  ${ButtonsStyle}
  border: #ed5e5e solid 1px;
  color: #ed5e5e;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f2cdcd;
  }
`;

export const HistoryButton = styled.button`
  ${ButtonsStyle}
  border: #adb5bd solid 1px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e0e8ef;
  }
`;

export const ButtonBorrow = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  gap: 0.5rem;
  border: #adb5bd solid 1px;
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ffd857;
  }
`;

export const LinkBorrow = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  gap: 0.5rem;
  border: #adb5bd solid 1px;
  background-color: #ffc501;
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ffd857;
  }
`;
