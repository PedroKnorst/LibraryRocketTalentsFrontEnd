import React from "react";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import Library from "./Library";
import NewBook from "./NewBook";
import History from "./History";
import { styled } from "styled-components";
import HomeNav from "./HomeNav";

const MainBackground = styled.main`
  background-color: white;
  margin: 1.5rem;
  border-radius: 5px;
`;

const NavBackground = styled.nav`
  display: flex;
  height: calc(100vh - 14rem);
  margin: auto;
  flex-wrap: wrap;
  padding: 2rem 0;
  gap: 2.5rem;
`;

const Home = () => {
  return (
    <div>
      <Header />
      <MainBackground>
        <NavBackground>
          <Routes>
            <Route path="/" element={<HomeNav />} />
            <Route path="biblioteca" element={<Library />} />
            <Route path="novo" element={<NewBook />} />
            <Route path="historico" element={<History />} />
          </Routes>
        </NavBackground>
      </MainBackground>
    </div>
  );
};

export default Home;
