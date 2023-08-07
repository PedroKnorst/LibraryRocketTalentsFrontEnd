import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const ContainerBook = styled.div`
  position: absolute;
  overflow: auto;
  max-height: 30rem;
  top: 3rem;
  bottom: 3rem;
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

  & h2 {
    justify-self: center;
    font-weight: 600;
    font-size: 1.25rem;
    color: #3e4756;
  }
`;

export const TextAreaStyle = styled.textarea`
  resize: none;
  border: #133052 solid 1px;
  border-radius: 5px;
  padding: 1rem;
  color: #3e4756;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
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

export const InactiveLink = styled(Link)`
  ${ButtonsStyle}
  text-decoration: none;
  border: #ed5e5e solid 1px;
  color: #ed5e5e;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f2cdcd;
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

export const ActiveButton = styled.button`
  ${ButtonsStyle}
  border: #49D749 solid 1px;
  color: #49d749;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #b5fbb5;
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

const ButtonBorrowStyle = `
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  gap: 0.5rem;
  padding: 1rem;
  border: #adb5bd solid 1px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
`;

export const ButtonBorrow = styled(Link)`
  text-decoration: none;
  ${ButtonBorrowStyle}
  background-color: #f4f4f4;

  &:hover {
    background-color: #cdcdcd;
  }
`;

interface Props {
  active: string;
}

export const LinkBorrow = styled(Link)<Props>`
  text-decoration: none;
  ${ButtonBorrowStyle}
  background-color: #ffc501;
  position: relative;

  ${({ active }) =>
    active === "true"
      ? "&:hover {background-color: #ffd857;}"
      : ` cursor: not-allowed;
          &::after {
            content: "";
            position: absolute;
            background-color: rgba(173, 181, 189, 0.5);
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
         `}
`;

export const ContainerLinkBorrow = styled.button`
  grid-column: 2 / 3;
  border: none;
  ${ButtonBorrowStyle}
  background-color: #ffc501;

  &:hover {
    background-color: #ffd857;
  }
`;

export const ContainerDataStudent = styled.div`
  display: grid;
  grid-column: 1 / 3;

  & h2 + div {
    display: grid;
    grid-template-columns: repeat(4, auto);
    background-color: #f4f4f4;
    border-radius: 5px;
    padding: 1rem;
  }

  & div div h3 {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #3e4756;
  }

  & div div p {
    color: #3e4756;
    font-size: 1rem;
    font-weight: 300;
  }

  & h2 {
    justify-self: start;
    color: #3e4756;
    font-weight: 500;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
`;
