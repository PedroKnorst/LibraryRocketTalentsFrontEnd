import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Paths/Login";
import Home from "./Paths/Home";
import NewBook from "./Paths/NewBook";
import Library from "./Paths/Library";
import History from "./Paths/History";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/novoLivro" element={<NewBook />} />
          <Route path="/home/biblioteca/*" element={<Library />} />
          <Route path="/home/historico" element={<History />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
