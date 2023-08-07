import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Paths/Login";
import Home from "./Paths/Home";
import { UserStorage } from "./UserContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home/*" element={<Home />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
