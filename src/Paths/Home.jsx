import React from "react";
import "../App.css";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Library from "./Library";
import NewBook from "./NewBook";
import History from "./History";
import { styled } from "styled-components";
import HomeNav from "./HomeNav";

const MainBackground = styled.main`
  height: 100%;
  background-color: white;
  margin: 1.5rem;
  border-radius: 5px;
`;

const Home = () => {
  return (
    <>
      <Header />
      <MainBackground>
        <Routes>
          <Route path="/" element={<HomeNav />} />
          <Route path="biblioteca" element={<Library />} />
          <Route path="novo" element={<NewBook />} />
          <Route path="historico" element={<History />} />
        </Routes>
      </MainBackground>
    </>
  );
};

export default Home;
