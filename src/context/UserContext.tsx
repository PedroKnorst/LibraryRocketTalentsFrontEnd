import React from 'react';
import { getBooks, getHistory } from '../services/books';
import { Book } from '../interfaces/book';
import { Loan } from '../interfaces/history';

type DataBooks = {
  books: Book[];
};

type DataHistory = {
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

export const UserHistoryContext = React.createContext<DataHistory>(DataDefault);
export const UserBooksContext = React.createContext<DataBooks>(DataDefault);

const UserHistoryStorage = ({ children }: BookProps) => {
  const [history, setHistory] = React.useState(null);

  React.useEffect(() => {
    getHistory().then(res => {
      setHistory(res.data);
    });
  }, []);

  if (history)
    return <UserHistoryContext.Provider value={{ history: history }}>{children}</UserHistoryContext.Provider>;
  else return null;
};

const UserBooksStorage = ({ children }: BookProps) => {
  const [books, setBooks] = React.useState(null);

  React.useEffect(() => {
    getBooks().then(res => {
      setBooks(res.data);
    });
  }, []);

  if (books) return <UserBooksContext.Provider value={{ books: books }}>{children}</UserBooksContext.Provider>;
  else return null;
};

export { UserHistoryStorage, UserBooksStorage };
