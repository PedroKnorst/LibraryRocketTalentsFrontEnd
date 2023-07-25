import React from "react";
import "../App.css";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Library from "./Library";
import NewBook from "./NewBook";
import History from "./History";
import { styled } from "styled-components";
import HomeNav from "./HomeNav";

const NavBackground = styled.nav`
  height: calc(100vh - 13.5rem);
  background-color: white;
  margin: 1.5rem;
  border-radius: 5px;
  padding: 2rem 0;
  gap: 2.5rem;
`;

const Home = () => {
  return (
    <div>
      <Header />
      <NavBackground>
        <Routes>
          <Route path="/" element={<HomeNav />} />
          <Route path="biblioteca" element={<Library />} />
          <Route path="novo" element={<NewBook />} />
          <Route path="historico" element={<History />} />
        </Routes>
      </NavBackground>
    </div>
  );
};

export default Home;
