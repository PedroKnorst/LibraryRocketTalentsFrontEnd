import React from "react";
import BookIsBorrowed from "./BookIsBorrowed";
import BookIsNotBorrowed from "./BookIsNotBorrowed";
import { getBook } from "../../services/books";
import { useParams } from "react-router-dom";

const BookContent = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getBook(id).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, [id]);

  // React.useEffect(() => {
  //   getBook(data.id).then((res) => {
  //     console.log(res.data);
  //     setNewData(res.data);
  //   });
  // }, [data]);

  // React.useEffect(() => {
  //   putBook(data.id, { ...data }).then((res) => {
  //     console.log(res.data);
  //     return res.data;
  //   });
  // }, [data]);

  // function closeModal() {
  //   setModal(null);
  // }

  // function isBorrowed() {
  //   setBorrow((borrow) => !borrow);
  //   data.isBorrowed = borrow;
  // }

  if (data)
    return (
      <>
        {data.isBorrowed ? (
          <BookIsBorrowed data={data} />
        ) : (
          <BookIsNotBorrowed data={data} />
        )}
      </>
    );
  else return null;
};

export default BookContent;
