import React from "react";
import "../App.css";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import NewBook from "./NewBook";
import History from "./History";
import { styled } from "styled-components";
import HomeNav from "./HomeNav";
import EditBook from "./EditBook";
import Library from "./Library";

const MainBackground = styled.main`
  height: calc(100vh - 9.3rem);
  background-color: white;
  margin: 1.5rem;
  border-radius: 5px;
  overflow: auto;
`;

const Home = () => {
  return (
    <>
      <Header />
      <MainBackground>
        <Routes>
          <Route path="/" element={<HomeNav />} />
          <Route path="biblioteca/*" element={<Library />} />
          <Route path="editar/:id" element={<EditBook />} />
          <Route path="novo" element={<NewBook />} />
          <Route path="historico" element={<History />} />
        </Routes>
      </MainBackground>
    </>
  );
};

export default Home;