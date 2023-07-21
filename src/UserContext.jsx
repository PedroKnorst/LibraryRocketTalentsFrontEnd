import React from "react";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);

  function changeData(newData) {
    setData(newData);
  }

  return (
    <UserContext.Provider value={(data, changeData)}>
      {children}
    </UserContext.Provider>
  );
};
