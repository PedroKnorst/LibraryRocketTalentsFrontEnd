import "../../App.css";
import Header from "../../components/Header";
import { Route, Routes } from "react-router-dom";
import NewBook from "../NewBook";
import History from "../History";
import EditBook from "../EditBook";
import Library from "../Library";
import NavHomePage from "../NavHomePage";
import { MainBackground } from "./style";

const Home = () => {
  return (
    <>
      <Header />
      <MainBackground>
        <Routes>
          <Route path="/" element={<NavHomePage />} />
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
