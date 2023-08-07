import React from "react";
import { getBooks, getHistory } from "./services/books";
import { getUsers } from "./services/users";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: {
    isActive: boolean;
    description: string;
  };
  isBorrowed: boolean;
  image: string;
  systemEntryDate: string;
  synopsis: string;
  rentHistory: Loan[];
}

export interface User {
  email: string;
  password: string;
}

export interface Loan {
  bookTitle?: string;
  studentName: string;
  class: string;
  withdrawalDate: string;
  deliveryDate: string;
}

type Data = {
  books: Book[];
  users: User[];
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
      <UserContext.Provider
        value={{ books: books, users: users, history: history }}
      >
        {children}
      </UserContext.Provider>
    );
  else return null;
};

export { UserStorage };
