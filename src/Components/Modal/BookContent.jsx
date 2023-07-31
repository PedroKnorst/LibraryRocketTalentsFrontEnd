import React from "react";
import BookIsBorrowed from "./BookIsBorrowed";
import BookInformations from "./BookInfomations";
import { getBook } from "../../services/books";
import { useParams } from "react-router-dom";
import BookIsInactive from "./BookIsInactive";

const BookContent = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getBook(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  if (data) {
    if (!data.isBorrowed && data.status.isActive)
      return <BookInformations data={data} />;
    else if (data.isBorrowed && data.status.isActive)
      return <BookIsBorrowed data={data} />;
    else if (!data.isBorrowed && !data.status.isActive)
      return <BookIsInactive data={data} />;
    else return null;
  } else return null;
};

export default BookContent;
