import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Paths/Login";
import Home from "./Paths/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
