import React from 'react';
import '../../App.css';
import Header from '../../components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NewBook from '../Book/NewBook';
import History from '../History';
import EditBook from '../Book/EditBook';
import Library from '../Library';
import { MainBackground } from './style';
import NavHome from '../NavHome';
import { UserBooksStorage, UserHistoryStorage } from '../../context/UserContext';

const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem('User')) navigate('/');
  }, [navigate]);

  return (
    <div data-testid="homePage">
      <Header />
      <MainBackground>
        <Routes>
          <Route path="/" element={<NavHome />} />
          <Route
            path="biblioteca/*"
            element={
              <UserBooksStorage>
                <Library />
              </UserBooksStorage>
            }
          />
          <Route
            path="editar/:id"
            element={
              <UserBooksStorage>
                <EditBook />
              </UserBooksStorage>
            }
          />
          <Route
            path="novo"
            element={
              <UserBooksStorage>
                <NewBook />
              </UserBooksStorage>
            }
          />
          <Route
            path="historico"
            element={
              <UserHistoryStorage>
                <History />
              </UserHistoryStorage>
            }
          />
        </Routes>
      </MainBackground>
    </div>
  );
};

export default Home;
