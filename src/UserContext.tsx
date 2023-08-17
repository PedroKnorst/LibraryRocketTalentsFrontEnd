import React from 'react';
import { getBooks, getHistory } from './services/books';
import { Book } from './interfaces/book';
import { Loan } from './interfaces/history';

type Data = {
  books: Book[];
  history: Loan[];
};

const DataDefault = {
  books: [],
  users: [],
  history: [],
};

type BookProps = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<Data>(DataDefault);

const UserStorage = ({ children }: BookProps) => {
  const [books, setBooks] = React.useState(null);
  const [history, setHistory] = React.useState(null);

  React.useEffect(() => {
    getBooks().then(res => {
      setBooks(res.data);
    });

    getHistory().then(res => {
      setHistory(res.data);
    });
  }, []);

  if (books && history)
    return <UserContext.Provider value={{ books: books, history: history }}>{children}</UserContext.Provider>;
  else return null;
};

export { UserStorage };
