import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserStorage } from "./UserContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/:account/*" element={<Home />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
