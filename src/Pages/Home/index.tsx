import "../../App.css";
import Header from "../../components/Header";
import { Route, Routes } from "react-router-dom";
import NewBook from "../Book/NewBook";
import History from "../History";
import EditBook from "../Book/EditBook";
import Library from "../Library";
import { MainBackground } from "./style";
import NavHome from "../NavHome";

const Home = () => {
  return (
    <>
      <Header />
      <MainBackground>
        <Routes>
          <Route path={`/`} element={<NavHome />} />
          <Route path={`biblioteca/*`} element={<Library />} />
          <Route path={`editar/:id`} element={<EditBook />} />
          <Route path={`novo`} element={<NewBook />} />
          <Route path={`historico`} element={<History />} />
        </Routes>
      </MainBackground>
    </>
  );
};

export default Home;
