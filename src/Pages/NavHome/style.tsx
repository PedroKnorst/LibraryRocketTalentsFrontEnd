import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const NavHomeContainer = styled.nav`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 650px) {
    margin: 1rem;
  }
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

  @media (max-width: 400px) {
    width: 200px;
  }
`;

export const NavHomeText = styled.div`
  background-color: white;
  display: grid;
  align-items: center;
`;
