import React from "react";
import { getBooks, getHistory, putBook } from "./services/books";
import { getUsers } from "./services/users";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [books, setBooks] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [history, setHistory] = React.useState(null);

  React.useEffect(() => {
    getBooks().then((res) => {
      setBooks(res.data);
    });

    getUsers().then((res) => {
      setUsers(res.data);
    });

    getHistory().then((res) => {
      setHistory(res.data);
    });
  }, []);

  if (books && users && history)
    return (
      <UserContext.Provider value={{ books, users, history }}>
        {children}
      </UserContext.Provider>
    );
  else return null;
};
