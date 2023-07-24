import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const NavHome = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
  gap: 2.5rem;
`;

export const NavHomeLi = styled(Link)`
  display: grid;
  grid-template-rows: 2fr 1fr;
  background-color: #f4f4f4;
  border: #f4f4f4 solid 3px;
  text-align: center;
  border-radius: 5px;
  font-weight: 500;
  transition: all linear 0.2s;
  cursor: pointer;
  text-decoration: none;
  color: #343a40;

  &:hover {
    background-color: #ffc501;
    border: #ffc501 solid 3px;
  }
`;

export const NavHomeIcon = styled.div`
  width: 250px;
  height: 150px;
  align-items: center;
  justify-content: center;
  display: grid;
`;

export const NavHomeText = styled.div`
  background-color: white;
  display: grid;
  align-items: center;
`;
