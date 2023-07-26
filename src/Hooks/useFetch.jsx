import React from "react";

const useFetch = () => {
  const [data, setData] = React.useState(null);

  const request = React.useCallback(async () => {
    let response = await fetch("http://localhost:3001");
    let json = await response.json();
    console.log(json);
    setData(json);
  }, []);

  request();

  return { data };
};

export default useFetch;
